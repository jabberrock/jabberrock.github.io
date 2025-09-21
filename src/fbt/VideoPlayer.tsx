import React, { useContext, useEffect, useRef, useState } from "react";

export const OpacityContext = React.createContext({ current: 0.0 });

type VideoPlayerProps = {
    base_url: string;
    overlay_url: string;
    thumbnail_url: string;
    width: number;
    height: number;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
    base_url,
    overlay_url,
    thumbnail_url,
    width,
    height,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const offscreenCanvasRef = useRef<HTMLCanvasElement>(null);
    const baseVideoRef = useRef<HTMLVideoElement>(null);
    const overlayVideoRef = useRef<HTMLVideoElement>(null);
    const opacityRef = useContext(OpacityContext);

    const [inView, setInView] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [baseLoaded, setBaseLoaded] = useState(false);
    const [overlayLoaded, setOverlayLoaded] = useState(false);

    // Observe when the player comes into view
    useEffect(() => {
        const observer =
            new IntersectionObserver(
                entries => entries.forEach(e => setInView(e.isIntersecting)));
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
                fetch(base_url).then(res => res.blob()).then(blob => {
                    baseVideo.src = URL.createObjectURL(blob);
                    setBaseLoaded(true);
                });
                fetch(overlay_url).then(res => res.blob()).then(blob => {
                    overlayVideo.src = URL.createObjectURL(blob);
                    setOverlayLoaded(true);
                });
            }
        }
    }, [inView, fetching])

    // Play videos when both are loaded and the player is in view
    useEffect(() => {
        if (baseLoaded && overlayLoaded) {
            const baseVideo = baseVideoRef.current;
            const overlayVideo = overlayVideoRef.current;
            if (baseVideo && overlayVideo) {
                if (inView) {
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
        let frameId: number;
        const render = () => {
            const canvas = canvasRef.current;
            const offscreenCanvas = offscreenCanvasRef.current;
            const baseVideo = baseVideoRef.current;
            const overlayVideo = overlayVideoRef.current;
            if (!canvas || !offscreenCanvas || !baseVideo || !overlayVideo) {
                return;
            }

            if (!baseVideo.paused) {
                // Try to sync the two video streams
                if (Math.abs(overlayVideo.currentTime - baseVideo.currentTime) > 0.1) {
                    console.log("Syncing!")
                    overlayVideo.currentTime = baseVideo.currentTime;
                }

                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                if (!ctx) {
                    return;
                }

                const offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
                if (!offscreenCtx) {
                    return;
                }

                // Draw base video directly
                ctx.drawImage(baseVideo, 0, 0, width, height);

                // Draw overlay into offscreen canvas
                offscreenCtx.drawImage(overlayVideo, 0, 0, width, height);
                const frame = offscreenCtx.getImageData(0, 0, width, height);
                const data = frame.data;

                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    if (g > 100 && g > r * 1.4 && g > b * 1.4) {
                        data[i + 3] = 0; // make green transparent
                    }
                }

                offscreenCtx.putImageData(frame, 0, 0);

                // Composite the processed overlay on top
                ctx.globalAlpha = opacityRef.current;
                ctx.drawImage(offscreenCanvas, 0, 0);
                ctx.globalAlpha = 1.0;
            }

            frameId = requestAnimationFrame(render);
        };

        if (baseLoaded && overlayLoaded) {
            render();
        }
        return () => cancelAnimationFrame(frameId);
    }, [baseLoaded, overlayLoaded, width, height]);

    return (
        <div
            ref={containerRef}
            style={{ width, height, position: "relative", overflow: "hidden" }}
        >
            {(!baseLoaded || !overlayLoaded) && (
                <img
                    src={thumbnail_url}
                    alt="thumbnail"
                    style={{ width, height, position: "absolute", top: 0, left: 0 }}
                />
            )}
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{ width, height }}
            />
            <canvas
                ref={offscreenCanvasRef}
                width={width}
                height={height}
                style={{ width, height, display: "none" }}
            />
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
