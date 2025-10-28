import { useState, type FC, type PropsWithChildren } from "react";

type DrawbackSectionProps = {
    title: string;
    initiallyCollapsed?: boolean;
    className?: string;
} & PropsWithChildren;

export const CollapsibleSection: FC<DrawbackSectionProps> = ({
    title,
    initiallyCollapsed = false,
    className,
    children,
}) => {
    const [collapsed, setCollapsed] = useState<boolean>(initiallyCollapsed);

    return (
        <div className={className}>
            <div className={`header ${collapsed ? "collapsed" : "opened"}`}>
                <div className="title">{title}</div>
                <div className="opener">
                    <input type="button" value={collapsed ? "⯆" : "⯅"} onClick={() => setCollapsed(!collapsed)} />
                </div>
            </div>
            {!collapsed && children}
        </div>
    );
};
