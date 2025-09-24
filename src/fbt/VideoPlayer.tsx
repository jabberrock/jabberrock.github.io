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
                    baseVideo.addEventListener("canplaythrough", () => setBaseLoaded(true));
                    baseVideo.src = URL.createObjectURL(blob);
                });
                fetch(overlay_url).then(res => res.blob()).then(blob => {
                    overlayVideo.addEventListener("canplaythrough", () => setOverlayLoaded(true));
                    overlayVideo.src = URL.createObjectURL(blob);
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
        let frameId: number;
        const render = () => {
            if (inView) {
                const canvas = canvasRef.current;
                const offscreenCanvas = offscreenCanvasRef.current;
                const baseThumbnail = baseThumbnailRef.current;
                const overlayThumbnail = overlayThumbnailRef.current;
                const baseVideo = baseVideoRef.current;
                const overlayVideo = overlayVideoRef.current;
                if (!canvas || !offscreenCanvas || !baseThumbnail || !overlayThumbnail || !baseVideo || !overlayVideo) {
                    return;
                }

                const ctx = canvas.getContext("2d", { willReadFrequently: true });
                if (!ctx) {
                    return;
                }

                const offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
                if (!offscreenCtx) {
                    return;
                }

                if (baseLoaded && overlayLoaded) {
                    ctx.drawImage(baseVideo, 0, 0, width, height);
                    offscreenCtx.drawImage(overlayVideo, 0, 0, width, height);
                } else if (baseThumbnail.naturalWidth > 0 && overlayThumbnail.naturalWidth > 0) {
                    ctx.drawImage(baseThumbnail, 0, 0, width, height);
                    offscreenCtx.drawImage(overlayThumbnail, 0, 0, width, height);
                }

                // Draw overlay into offscreen canvas
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
        render();
        
        return () => cancelAnimationFrame(frameId);
    }, [inView, baseLoaded, overlayLoaded, width, height]);

    return (
        <div
            ref={containerRef}
            style={{ width, height, position: "relative", overflow: "hidden" }}
        >
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
            <img
                ref={baseThumbnailRef}
                src={base_thumbnail_url}
                style={{ display: "none" }}
            />
            <img
                ref={overlayThumbnailRef}
                src={overlay_thumbnail_url}
                style={{ display: "none" }}
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
