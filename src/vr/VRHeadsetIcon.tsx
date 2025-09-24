import type React from "react";

type VRHeadset = {
    name: string
    imageURL: string
};

export type VRHeadsetKey = 
    "oculus_rift" | "oculus_rift_s" |
    "meta_quest_2" | "meta_quest_3" | "meta_quest_3s" | "meta_quest_pro" |
    "htc_vive" | "htc_vive_pro" | "htc_vive_pro_2" |
    "valve_index" |
    "generic_inside_out" | "generic_lighthouse_based";

const vrHeadsets: Record<VRHeadsetKey, VRHeadset> = {
    oculus_rift: {
        name: "Oculus Rift",
        imageURL: "vr_headsets/unknown.jpg"
    },
    oculus_rift_s: {
        name: "Oculus Rift S",
        imageURL: "vr_headsets/unknown.jpg"
    },
    meta_quest_2: {
        name: "Meta Quest 2",
        imageURL: "vr_headsets/unknown.jpg"
    },
    meta_quest_3: {
        name: "Meta Quest 3",
        imageURL: "vr_headsets/meta_quest_3.jpg"
    },
    meta_quest_3s: {
        name: "Meta Quest 3S",
        imageURL: "vr_headsets/unknown.jpg"
    },
    meta_quest_pro: {
        name: "Meta Quest Pro",
        imageURL: "vr_headsets/unknown.jpg"
    },
    htc_vive: {
        name: "HTC VIVE",
        imageURL: "vr_headsets/unknown.jpg"
    },
    htc_vive_pro: {
        name: "HTC VIVE Pro",
        imageURL: "vr_headsets/unknown.jpg"
    },
    htc_vive_pro_2: {
        name: "HTC VIVE Pro 2",
        imageURL: "vr_headsets/unknown.jpg"
    },
    valve_index: {
        name: "Valve Index",
        imageURL: "vr_headsets/unknown.jpg"
    },
    generic_inside_out: {
        name: "Generic Inside-Out Headset",
        imageURL: "vr_headsets/unknown.jpg"
    },
    generic_lighthouse_based: {
        name: "Generic Lighthouse-tracked Headset",
        imageURL: "vr_headsets/unknown.jpg"
    },
}

const unknownVRHeadset: VRHeadset = {
    name: "Unknown",
    imageURL: "vr_headsets/unknown.jpg"
}

type VRHeadsetIconProps = {
    headsetKey: VRHeadsetKey
}

export const VRHeadsetIcon: React.FC<VRHeadsetIconProps> = ({
    headsetKey
}) => {
    var vrHeadset = vrHeadsets[headsetKey] || unknownVRHeadset;

    return (
        <div className="vr-headset-icon">
            <div><img src={vrHeadset.imageURL} /></div>
            <div>{vrHeadset.name}</div>
        </div>
    )
};
