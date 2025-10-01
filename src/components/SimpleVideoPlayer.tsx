import { useEffect, useRef, useState, type FC } from "react";

type SimpleVideoPlayerProps = {
    src: string;
    width: number;
    height: number;
};

export const SimpleVideoPlayer: FC<SimpleVideoPlayerProps> = ({ src, width, height }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => entries.forEach((e) => setInView(e.isIntersecting)));
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (inView && video && !video.src) {
            video.src = src;
        }
    }, [inView]);

    return (
        <video
            ref={videoRef}
            playsInline
            loop
            muted
            autoPlay
            crossOrigin="anonymous"
            preload="auto"
            style={{ width, height }}
        />
    );
};
