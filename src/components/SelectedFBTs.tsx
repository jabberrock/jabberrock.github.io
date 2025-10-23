import React, { createContext, useContext, useState, type FC } from "react";
import { vrHeadsetFBTRecommendations, type VRFBTSystem } from "../vrfbt/VRFBTSystem";
import type { VRSystem } from "../vr/VR";
import { fbtSystemConfigsByKey, type FBTSystemConfigKey } from "../fbt/FBT";
import { makeSlimeVR } from "../vrfbt/SlimeVR";
import { makeHTCVive30 } from "../vrfbt/HTCVive30";
import { makeHTCViveUltimate } from "../vrfbt/HTCViveUltimate";
import { ColumnTableContext } from "./ColumnTable";

type SelectedFBTsContextType = {
    selected: (VRFBTSystem | undefined)[];
    setSelected: (i: number, option: FBTSystemConfigKey | undefined) => any;
};

export const SelectedFBTsContext = createContext<SelectedFBTsContextType>({
    selected: [],
    setSelected: () => {},
});

type SelectedFBTsProps = {
    vrSystem: VRSystem;
} & React.PropsWithChildren;

export const SelectedFBTs: FC<SelectedFBTsProps> = ({ vrSystem, children }) => {
    const columnTableContext = useContext(ColumnTableContext);

    const [selected, setSelected] = useState<(FBTSystemConfigKey | undefined)[]>(
        vrHeadsetFBTRecommendations[vrSystem.headset],
    );

    function updateSelectedSystem(i: number, option: FBTSystemConfigKey | undefined) {
        const newOptions = [...selected];
        if (option) {
            for (let i = 0; i < newOptions.length; ++i) {
                if (newOptions[i] == option) {
                    newOptions[i] = undefined;
                }
            }
            newOptions[i] = option;
        } else {
            newOptions[i] = undefined;
        }
        setSelected(newOptions);
    }

    const systems: (VRFBTSystem | undefined)[] = [];
    for (let i = 0; i < columnTableContext.numColumns; ++i) {
        const key = selected[i];
        if (key) {
            switch (fbtSystemConfigsByKey[key].fbtSystemKey) {
                case "slimevr_trackers":
                    systems.push(makeSlimeVR(vrSystem, key));
                    break;
                case "htc_vive_trackers_3_0":
                    systems.push(makeHTCVive30(vrSystem, key));
                    break;
                case "htc_vive_ultimate_trackers":
                    systems.push(makeHTCViveUltimate(vrSystem, key));
                    break;
                default:
                    throw "Invalid FBT system";
            }
        } else {
            systems.push(undefined);
        }
    }

    return (
        <SelectedFBTsContext
            value={{
                selected: systems,
                setSelected: updateSelectedSystem,
            }}
        >
            {children}
        </SelectedFBTsContext>
    );
};
