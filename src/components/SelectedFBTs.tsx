import React, { createContext, useState, type FC } from "react";
import { findFBTSystemOption, type FBTSystemConfigOption } from "./FBTSystemSelect";
import { vrHeadsetFBTRecommendations } from "../vrfbt/VRFBTSystem";
import type { VRSystem } from "../vr/VR";

type SelectedFBTsContextType = {
    selected: (FBTSystemConfigOption | null)[];
    setSelected: (i: number, option: FBTSystemConfigOption | null) => any;
};

export const SelectedFBTsContext = createContext<SelectedFBTsContextType>({
    selected: [],
    setSelected: () => {},
});

type SelectedFBTsProps = {
    vrSystem: VRSystem;
} & React.PropsWithChildren;

export const SelectedFBTs: FC<SelectedFBTsProps> = ({ vrSystem, children }) => {
    const [selected, setSelected] = useState<(FBTSystemConfigOption | null)[]>(
        vrHeadsetFBTRecommendations[vrSystem.headset].map((f) => findFBTSystemOption(f.config)),
    );

    function updateSelectedSystem(i: number, option: FBTSystemConfigOption | null) {
        const newOptions = [...selected];
        if (option) {
            for (let i = 0; i < newOptions.length; ++i) {
                if (newOptions[i] == option) {
                    newOptions[i] = null;
                }
            }
            newOptions[i] = option;
        } else {
            newOptions[i] = null;
        }
        setSelected(newOptions);
    }

    return (
        <SelectedFBTsContext
            value={{
                selected: selected,
                setSelected: updateSelectedSystem,
            }}
        >
            {children}
        </SelectedFBTsContext>
    );
};
