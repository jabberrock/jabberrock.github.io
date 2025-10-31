import React, { createContext, useState, type FC } from "react";
import { defaultRecommendations, type VRFBTSystem } from "../vrfbt/VRFBTSystem";
import { fbtSystemConfigsByKey, type FBTSystemConfigKey } from "../fbt/FBT";
import { makeSlimeVR } from "../vrfbt/SlimeVR";
import { makeHTCVive30 } from "../vrfbt/HTCVive30";
import { makeHTCViveUltimate } from "../vrfbt/HTCViveUltimate";
import { type VRHeadsetKey } from "../vr/VR";

const maxSelected = 4;

type SelectedFBTsContextType = {
    selected: (VRFBTSystem | undefined)[];
    setSelected: (i: number, option: FBTSystemConfigKey | undefined) => any;
};

export const SelectedFBTsContext = createContext<SelectedFBTsContextType>({
    selected: [],
    setSelected: () => {},
});

type SelectedFBTsProps = {
    vrHeadsetKey: VRHeadsetKey;
} & React.PropsWithChildren;

export const SelectedFBTs: FC<SelectedFBTsProps> = ({ vrHeadsetKey, children }) => {
    const [selected, setSelected] = useState<(FBTSystemConfigKey | undefined)[]>(defaultRecommendations);

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
    for (let i = 0; i < maxSelected; ++i) {
        const key = selected[i];
        if (key) {
            switch (fbtSystemConfigsByKey[key].fbtSystemKey) {
                case "slimevr_trackers":
                    systems.push(makeSlimeVR(vrHeadsetKey, key));
                    break;
                case "htc_vive_trackers_3_0":
                    systems.push(makeHTCVive30(vrHeadsetKey, key));
                    break;
                case "htc_vive_ultimate_trackers":
                    systems.push(makeHTCViveUltimate(vrHeadsetKey, key));
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
