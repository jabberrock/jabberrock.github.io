import { useEffect, useRef, useState, type FC } from "react";

type SimpleImageProps = {
    src: string
    width: number
    height: number
};

export const SimpleImage: FC<SimpleImageProps> = ({
    src,
    width,
    height,
}) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => entries.forEach((e) => setInView(e.isIntersecting)));
        if (imageRef.current) {
            observer.observe(imageRef.current);
        }
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const image = imageRef.current;
        if (inView && image && !image.src) {
            image.src = src;
        }
    }, [inView]);

    return (
        <img
            ref={imageRef}
            style={{ width, height }}
        />
    )
};
