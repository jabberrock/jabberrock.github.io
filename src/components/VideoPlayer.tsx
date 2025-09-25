import React, { useContext, useEffect, useRef, useState } from "react";

export const OpacityContext = React.createContext({ current: 0.0 });

type VideoPlayerProps = {
    base_url: string;
    overlay_url: string;
    base_thumbnail_url: string;
    overlay_thumbnail_url: string;
    width: number;
    height: number;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    base_url,
    overlay_url,
    base_thumbnail_url,
    overlay_thumbnail_url,
    width,
    height,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offscreenCanvasRef = useRef<HTMLCanvasElement>(null);
    const baseThumbnailRef = useRef<HTMLImageElement>(null);
    const overlayThumbnailRef = useRef<HTMLImageElement>(null);
    const baseVideoRef = useRef<HTMLVideoElement>(null);
    const overlayVideoRef = useRef<HTMLVideoElement>(null);
    const opacityRef = useContext(OpacityContext);

    const [inView, setInView] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [baseLoaded, setBaseLoaded] = useState(false);
    const [overlayLoaded, setOverlayLoaded] = useState(false);

    // Observe when the player comes into view
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => entries.forEach((e) => setInView(e.isIntersecting)));
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }
        return () => observer.disconnect();
    }, []);

    // Load videos when the player comes into view
    useEffect(() => {
        if (inView && !fetching) {
            const baseVideo = baseVideoRef.current;
            const overlayVideo = overlayVideoRef.current;
            if (baseVideo && overlayVideo) {
                setFetching(true);
                fetch(base_url)
                    .then((res) => res.blob())
                    .then((blob) => {
                        baseVideo.addEventListener("canplaythrough", () => setBaseLoaded(true));
                        baseVideo.src = URL.createObjectURL(blob);
                    });
                fetch(overlay_url)
                    .then((res) => res.blob())
                    .then((blob) => {
                        overlayVideo.addEventListener("canplaythrough", () => setOverlayLoaded(true));
                        overlayVideo.src = URL.createObjectURL(blob);
                    });
            }
        }
    }, [inView, fetching]);

    // Play videos when both are loaded and the player is in view
    useEffect(() => {
        if (baseLoaded && overlayLoaded) {
            const baseVideo = baseVideoRef.current;
            const overlayVideo = overlayVideoRef.current;
            if (baseVideo && overlayVideo) {
                if (inView) {
                    // Force the videos to sync up
                    baseVideo.currentTime = 0;
                    overlayVideo.currentTime = 0;
                    baseVideo.play();
                    overlayVideo.play();
                } else {
                    baseVideo.pause();
                    overlayVideo.pause();
                }
            }
        }
    }, [baseLoaded, overlayLoaded, inView]);

    // Rendering loop with green screen removal
    useEffect(() => {
        if (!inView) {
            return;
        }

        const canvas = canvasRef.current!;
        const baseThumbnail = baseThumbnailRef.current!;
        const overlayThumbnail = overlayThumbnailRef.current!;
        const baseVideo = baseVideoRef.current!;
        const overlayVideo = overlayVideoRef.current!;

        const gl = canvas.getContext("webgl")!;

        // ---------- Shader sources ----------
        const vsSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            varying vec2 v_texCoord;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_texCoord = a_texCoord;
            }
        `;

        const fsSource = `
            precision mediump float;
            uniform sampler2D u_baseTex;
            uniform sampler2D u_overlayTex;
            varying vec2 v_texCoord;
            void main() {
                vec4 baseColor = texture2D(u_baseTex, v_texCoord);
                vec4 overlayColor = texture2D(u_overlayTex, v_texCoord);

                // chroma key (green removal)
                vec3 keyColor = vec3(0.0, 1.0, 0.0);
                float threshold = 0.4;
                float slope = 0.2;
                float d = distance(overlayColor.rgb, keyColor);
                float alpha = smoothstep(threshold, threshold + slope, d);

                gl_FragColor = mix(baseColor, overlayColor, alpha);
            }
        `;

        function compileShader(src: string, type: number) {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
            }
            return shader;
        }

        const vs = compileShader(vsSource, gl.VERTEX_SHADER);
        const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);

        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
        }
        gl.useProgram(program);

        // ---------- Geometry ----------
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1, 1,
            -1, 1,
            1, -1,
            1, 1,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        const texCoords = new Float32Array([
            0, 1,
            1, 1,
            0, 0,
            0, 0,
            1, 1,
            1, 0,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

        const a_position = gl.getAttribLocation(program, "a_position");
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(a_position);
        gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

        const a_texCoord = gl.getAttribLocation(program, "a_texCoord");
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.enableVertexAttribArray(a_texCoord);
        gl.vertexAttribPointer(a_texCoord, 2, gl.FLOAT, false, 0, 0);

        // ---------- Texture setup ----------
        function createVideoTexture(unit: number) {
            const tex = gl.createTexture()!;
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            return tex;
        }

        const baseTex = createVideoTexture(0);
        const overlayTex = createVideoTexture(1);

        gl.uniform1i(gl.getUniformLocation(program, "u_baseTex"), 0);
        gl.uniform1i(gl.getUniformLocation(program, "u_overlayTex"), 1);

        // ---------- Render loop ----------
        function updateVideoTexture(tex: WebGLTexture, unit: number, source: HTMLImageElement | HTMLVideoElement) {
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        }

        let handle: number;
        function render() {
            if (baseLoaded && overlayLoaded) {
                updateVideoTexture(baseTex, 0, baseVideo);
                updateVideoTexture(overlayTex, 1, overlayVideo);
            } else {
                updateVideoTexture(baseTex, 0, baseThumbnail);
                updateVideoTexture(overlayTex, 1, overlayThumbnail);
            }

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            handle = requestAnimationFrame(render);
        }

        render();

        return () => cancelAnimationFrame(handle);
    }, [inView, baseLoaded, overlayLoaded, width, height]);

    return (
        <div ref={containerRef} style={{ width, height, position: "relative", overflow: "hidden" }}>
            <canvas ref={canvasRef} width={width} height={height} style={{ width, height }} />
            <canvas ref={offscreenCanvasRef} width={width} height={height} style={{ width, height, display: "none" }} />
            <img ref={baseThumbnailRef} src={base_thumbnail_url} style={{ display: "none" }} />
            <img ref={overlayThumbnailRef} src={overlay_thumbnail_url} style={{ display: "none" }} />
            <video
                ref={baseVideoRef}
                playsInline
                loop
                muted
                crossOrigin="anonymous"
                preload="auto"
                style={{ display: "none" }}
            />
            <video
                ref={overlayVideoRef}
                playsInline
                loop
                muted
                crossOrigin="anonymous"
                preload="auto"
                style={{ display: "none" }}
            />
        </div>
    );
};
