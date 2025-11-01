/**
 * Supported VR headsets
 */
export const vrHeadsetKeys = [
    "oculus_rift",
    "meta_quest",
    "htc_vive",
    "valve_index",
    "generic_inside_out",
    "generic_lighthouse_based",
] as const;

export type VRHeadsetKey = (typeof vrHeadsetKeys)[number];

/**
 * How the VR headset tracks its position
 */
export type VRHeadsetTracking = "inside_out" | "lighthouse" | "constellation";

/**
 * VR headset
 */
export type VRHeadset = {
    key: VRHeadsetKey;
    name: string;
    imageURL: string;
    tracking: VRHeadsetTracking;
    requiresPC: boolean;
};

/**
 * Details of each VR headset
 */
export const vrHeadsets: VRHeadset[] = [
    {
        key: "oculus_rift",
        name: "Oculus Rift/Rift S",
        imageURL: "/headsets/oculus_rift_s.jpg",
        tracking: "constellation",
        requiresPC: true,
    },
    {
        key: "meta_quest",
        name: "Meta Quest 2/3/3S/Pro",
        imageURL: "/headsets/meta_quest_3.jpg",
        tracking: "inside_out",
        requiresPC: false,
    },
    {
        key: "valve_index",
        name: "Valve Index",
        imageURL: "/headsets/valve_index.jpg",
        tracking: "lighthouse",
        requiresPC: true,
    },
    {
        key: "htc_vive",
        name: "HTC VIVE/VIVE Pro/VIVE Pro 2",
        imageURL: "/headsets/htc_vive_pro.jpg",
        tracking: "lighthouse",
        requiresPC: true,
    },
    {
        key: "generic_inside_out",
        name: "Inside-Out Headset",
        imageURL: "/headsets/unknown.jpg",
        tracking: "inside_out",
        requiresPC: false,
    },
    {
        key: "generic_lighthouse_based",
        name: "Lighthouse-based Headset",
        imageURL: "/headsets/unknown.jpg",
        tracking: "lighthouse",
        requiresPC: false,
    },
] as const;

export const vrHeadsetsByKey = Object.fromEntries(vrHeadsets.map((h) => [h.key, h])) as Record<VRHeadsetKey, VRHeadset>;
