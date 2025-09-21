import type React from "react";
import { useContext, useState } from "react";
import { OpacityContext } from "./VideoPlayer";

type SettingsProp = {
    onOpacityChange: (opacity: number) => any,
};

export const Settings: React.FC<SettingsProp> = ({
    onOpacityChange
}) => {
    const opacityRef = useContext(OpacityContext);
    const [opacity, setOpacity] = useState(opacityRef.current);
    return (
        <div className="settings">
            <label htmlFor="opacity">Opacity</label>
            <input
                name="opacity"
                type="range"
                min="0"
                max="100"
                value={Math.floor(opacity * 100)}
                onChange={e => {
                    const newOpacity = e.target.valueAsNumber / 100;
                    setOpacity(newOpacity);
                    onOpacityChange(newOpacity);
                }}
            />
        </div>
    )
}
