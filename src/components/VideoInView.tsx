import { useEffect, useRef, useState, type FC } from "react";

type VideoInViewProps = {
    src: string;
};

export const VideoInView: FC<VideoInViewProps> = ({ src }) => {
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
        if (video) {
            if (inView) {
                if (video.src !== src) {
                    video.src = src;
                    video.play();
                }
            } else {
                video.pause();
            }
        }
    }, [inView]);

    return <video ref={videoRef} poster={src.replace(/\.mp4$/, ".jpg")} autoPlay muted controls loop />;
};
