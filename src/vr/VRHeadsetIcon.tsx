import type React from "react";
import { vrHeadsetsByKey, type VRHeadsetKey } from "./VR";

type VRHeadset = {
    name: string;
    imageURL: string;
};

const unknownVRHeadset: VRHeadset = {
    name: "Unknown",
    imageURL: "vr_headsets/unknown.jpg",
};

type VRHeadsetIconProps = {
    headsetKey: VRHeadsetKey;
};

export const VRHeadsetIcon: React.FC<VRHeadsetIconProps> = ({ headsetKey }) => {
    var vrHeadset = vrHeadsetsByKey[headsetKey] || unknownVRHeadset;

    return (
        <div className="vr-headset-icon">
            <div>
                <img src={vrHeadset.imageURL} />
            </div>
            <div>{vrHeadset.name}</div>
        </div>
    );
};
