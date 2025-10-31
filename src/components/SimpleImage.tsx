import { useEffect, useRef, useState, type FC } from "react";

type SimpleImageProps = {
    src: string;
};

export const SimpleImage: FC<SimpleImageProps> = ({ src }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [inView, setInView] = useState(false);
    const [needsLoading, setNeedsLoading] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => entries.forEach((e) => setInView(e.isIntersecting)));
        if (imageRef.current) {
            observer.observe(imageRef.current);
        }
        return () => observer.disconnect();
    }, []);

    // Reset the image if the src has changed
    useEffect(() => {
        const image = imageRef.current;
        if (image) {
            image.removeAttribute("src");
            setNeedsLoading(true);
        }
    }, [src]);

    useEffect(() => {
        const image = imageRef.current;
        if (image && inView && needsLoading) {
            image.src = src;
        }
    }, [needsLoading, inView]);

    return <img ref={imageRef} />;
};
