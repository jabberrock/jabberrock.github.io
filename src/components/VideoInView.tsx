import { useEffect, useRef, useState, type FC } from "react";

type VideoInViewProps = {
    src: string;
    className?: string;
};

export const VideoInView: FC<VideoInViewProps> = ({ src, className }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [inView, setInView] = useState(false);
    const [needsLoading, setNeedsLoading] = useState(true);
    const [canLoad, setCanLoad] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => entries.forEach((e) => setInView(e.isIntersecting)));
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }
        return () => observer.disconnect();
    }, []);

    // Load video after the component enters view, and after a timeout, to
    // prevent loading everything when the user scrolls quickly
    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => setCanLoad(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [inView]);

    // Reset the video if the src has changed
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.removeAttribute("src");
            video.load();
            setNeedsLoading(true);
        }
    }, [src]);

    // Load video and play/pause
    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            if (inView) {
                if (needsLoading && canLoad) {
                    video.src = src;
                    setNeedsLoading(false);
                }
                video.play().then(() => {
                    video.pause();
                    video.play();
                });
            } else {
                video.pause();
            }
        }
    }, [needsLoading, canLoad, inView]);

    return (
        <video
            ref={videoRef}
            poster={src.replace(/\.mp4$/, ".jpg")}
            autoPlay
            muted
            controls
            loop
            playsInline
            className={className}
        />
    );
};
