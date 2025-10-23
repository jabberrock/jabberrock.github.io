import { createContext, useEffect, useRef, useState, type FC, type PropsWithChildren } from "react";

export const ColumnTableContext = createContext({ numColumns: 0, columnWidth: 0 });

type ColumnTableProps = {
    minColumns: number;
    maxColumns: number;
    columnWidth: number;
    sidebarWidth: number;
} & PropsWithChildren;

export const ColumnTable: FC<ColumnTableProps> = ({ minColumns, maxColumns, columnWidth, sidebarWidth, children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    setWidth(entry.contentRect.width);
                }
            });
            observer.observe(containerRef.current);
            return () => observer.disconnect();
        }
    }, []);

    return (
        <div ref={containerRef}>
            <ColumnTableContext
                value={{
                    numColumns: Math.min(
                        maxColumns,
                        Math.max(minColumns, Math.floor((width - sidebarWidth) / columnWidth)),
                    ),
                    columnWidth,
                }}
            >
                {children}
            </ColumnTableContext>
        </div>
    );
};
