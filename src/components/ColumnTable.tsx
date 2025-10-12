import { createContext, useEffect, useRef, useState, type FC, type PropsWithChildren } from "react";

export const ColumnTableContext = createContext({ numColumns: 0, columnWidth: 0 });

type ColumnTableProps = {
    minColumns: number
    maxColumns: number
    columnWidth: number
    className?: string
} & PropsWithChildren;

export const ColumnTable: FC<ColumnTableProps> = ({
    minColumns,
    maxColumns,
    columnWidth,
    className,
    children
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const observer = new ResizeObserver(entries => {
                for (const entry of entries) {
                    setWidth(entry.contentRect.width);
                }
            });
            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, []);

    return (
        <div ref={containerRef} className={className}>
            <ColumnTableContext value={{
                numColumns: Math.min(maxColumns, Math.max(minColumns, Math.floor(width / columnWidth))),
                columnWidth
            }}>
                {children}
            </ColumnTableContext>
        </div>
    )
}