import { useEffect, useRef, useState, type FC } from "react";

type SimpleImageProps = {
    src: string;
};

export const SimpleImage: FC<SimpleImageProps> = ({ src }) => {
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

    return <img ref={imageRef} />;
};
