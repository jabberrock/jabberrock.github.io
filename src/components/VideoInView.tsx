import { useEffect, useRef, useState, type FC } from "react";

type VideoInViewProps = {
    src: string;
};

export const VideoInView: FC<VideoInViewProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => entries.forEach((e) => setInView(e.isIntersecting)));
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;

        if (inView) {
            // only set to load if still in view after 1s
            timer = setTimeout(() => setShouldLoad(true), 1000);
        } else {
            // if it leaves view, cancel loading and pause
            if (timer) {
                clearTimeout(timer);
            }
            setShouldLoad(false);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [inView]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }

        if (shouldLoad && video.src == "") {
            video.src = src;
        }

        if (inView) {
            video.play();
        } else {
            video.pause();
        }
    }, [shouldLoad, inView, src]);

    return <video ref={videoRef} poster={src.replace(/\.mp4$/, ".jpg")} autoPlay muted controls loop />;
};
