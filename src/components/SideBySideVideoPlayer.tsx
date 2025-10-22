import React, { useContext, useEffect, useRef, useState } from "react";
import { OpacityContext } from "./VideoPlayer";

type WebGLContext = {
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    program: WebGLProgram;
};

const sharedWebGLContexts: WebGLContext[] = [];

function ensureWebGLContext(width: number, height: number): WebGLContext {
    const sharedCtx = sharedWebGLContexts.find((c) => c.width === width && c.height === height);
    if (sharedCtx) {
        return sharedCtx;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

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

        uniform sampler2D u_tex;   // combined texture: [0..0.5] = base, [0.5..1] = overlay
        uniform float u_opacity;

        varying vec2 v_texCoord;

        void main() {
            // --- compute base UV so base's left-half (0..0.5) is used ---
            // map left-screen [0..0.5] -> texture [0..0.5]
            // map right-screen [0.5..1] -> texture [0..0.5] as well
            float baseU = (v_texCoord.x < 0.5) ? v_texCoord.x : (v_texCoord.x - 0.5);
            vec2 baseUV = vec2(baseU, v_texCoord.y);
            vec4 baseColor = texture2D(u_tex, baseUV);

            // left half: just draw base
            if (v_texCoord.x < 0.5) {
                gl_FragColor = baseColor;
                return;
            }

            // --- right half: sample overlay from texture's right-half [0.5..1] ---
            // For screen x in [0.5..1], overlayUV.x should be in [0.5..1] => overlayUV.x = v_texCoord.x
            vec2 overlayUV = vec2(v_texCoord.x, v_texCoord.y);
            vec4 overlayColor = texture2D(u_tex, overlayUV);

            // --- chroma key using color-difference ---
            float threshold = 0.1;   // lower = stricter green removal
            float slope = 0.2;       // feathering
            float mask = overlayColor.g - max(overlayColor.r, overlayColor.b);
            float alpha = 1.0 - smoothstep(threshold, threshold + slope, mask);
            alpha *= u_opacity * overlayColor.a;

            // --- optional green spill suppression (same as your code) ---
            float spill = smoothstep(0.0, 1.0, alpha);
            overlayColor.g = mix((overlayColor.r + overlayColor.b) * 0.5, overlayColor.g, spill);

            // composite overlay over base (right side only)
            gl_FragColor = baseColor * (1.0 - alpha) + overlayColor * alpha;
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
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    const a_position = gl.getAttribLocation(program, "a_position");
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(a_position);
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

    const a_texCoord = gl.getAttribLocation(program, "a_texCoord");
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.enableVertexAttribArray(a_texCoord);
    gl.vertexAttribPointer(a_texCoord, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1i(gl.getUniformLocation(program, "u_tex"), 0);

    const ctx: WebGLContext = {
        width,
        height,
        canvas,
        gl,
        program,
    };

    sharedWebGLContexts.push(ctx);

    return ctx;
}

type SideBySideVideoPlayerProps = {
    video_url: string;
    thumbnail_url: string;
    width: number;
    height: number;
};

export const SideBySideVideoPlayer: React.FC<SideBySideVideoPlayerProps> = ({
    video_url,
    thumbnail_url: thumbnail_url,
    width,
    height,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const thumbnailRef = useRef<HTMLImageElement>(null);
    const opacityRef = useContext(OpacityContext);

    const [inView, setInView] = useState(false);

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
        const video = videoRef.current;
        if (inView && video && !video.src) {
            video.src = video_url;
        }
    }, [inView]);

    // Play videos when both are loaded and the player is in view
    useEffect(() => {
        const video = videoRef.current;
        if (video && video.src) {
            if (inView) {
                video.currentTime = 0.0;
                video.play();
            } else {
                video.pause();
            }
        }
    }, [inView]);

    // Rendering loop with green screen removal
    useEffect(() => {
        if (!inView) {
            return;
        }

        const { canvas: sharedCanvas, gl, program } = ensureWebGLContext(width * 2, height);

        const canvas = canvasRef.current!;
        const video = videoRef.current!;
        const thumbnail = thumbnailRef.current!;

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

        const tex = createVideoTexture(0);

        // ---------- Render loop ----------
        function updateTextureFromVideo(tex: WebGLTexture, unit: number, video: HTMLVideoElement) {
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        }

        function updateTextureFromImage(tex: WebGLTexture, unit: number, image: HTMLImageElement) {
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        }

        let handle: number;
        function render() {
            let ready = false;
            if (video.readyState >= 2) {
                updateTextureFromVideo(tex, 0, video);
                ready = true;
            } else if (thumbnail.naturalHeight > 0) {
                updateTextureFromImage(tex, 0, thumbnail);
                ready = true;
            }

            gl.uniform1f(gl.getUniformLocation(program, "u_opacity"), opacityRef.current);

            gl.viewport(0, 0, width, height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            if (ready) {
                gl.drawArrays(gl.TRIANGLES, 0, 6);
            }

            const canvasGL = canvas.getContext("2d")!;
            canvasGL.drawImage(sharedCanvas, 0, 0);

            handle = requestAnimationFrame(render);
        }
        render();

        return () => cancelAnimationFrame(handle);
    }, [inView, width, height]);

    return (
        <div ref={containerRef} style={{ width, height, position: "relative", overflow: "hidden" }}>
            <canvas ref={canvasRef} width={width} height={height} style={{ width, height }} />
            <img ref={thumbnailRef} src={thumbnail_url} style={{ display: "none" }} />
            <video
                ref={videoRef}
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
