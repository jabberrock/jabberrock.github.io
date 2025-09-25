/**
 * The VR system that the user owns
 */
export type VRSystem = {
    headset: VRHeadsetKey;
    prefersPCVR: boolean;
    ownsLighthouse: boolean;
};

/**
 * Supported VR headsets
 */
export const vrHeadsetKeys = [
    "oculus_rift",
    "oculus_rift_s",
    "meta_quest_2",
    "meta_quest_3",
    "meta_quest_3s",
    "meta_quest_pro",
    "htc_vive",
    "htc_vive_pro",
    "htc_vive_pro_2",
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
    imageURL?: string; // TODO: Should be required
    tracking: VRHeadsetTracking;
    requiresPC: boolean;
    requiresLighthouse: boolean;
};

/**
 * Details of each VR headset
 */
export const vrHeadsets: VRHeadset[] = [
    {
        key: "oculus_rift",
        name: "Oculus Rift",
        tracking: "constellation",
        requiresPC: true,
        requiresLighthouse: false,
    },
    {
        key: "oculus_rift_s",
        name: "Oculus Rift S",
        tracking: "inside_out",
        requiresPC: true,
        requiresLighthouse: false,
    },
    {
        key: "meta_quest_2",
        name: "Meta Quest 2",
        tracking: "inside_out",
        requiresPC: false,
        requiresLighthouse: false,
    },
    {
        key: "meta_quest_3",
        name: "Meta Quest 3",
        imageURL: "vr_headsets/meta_quest_3.jpg",
        tracking: "inside_out",
        requiresPC: false,
        requiresLighthouse: false,
    },
    {
        key: "meta_quest_3s",
        name: "Meta Quest 3S",
        tracking: "inside_out",
        requiresPC: false,
        requiresLighthouse: false,
    },
    {
        key: "meta_quest_pro",
        name: "Meta Quest Pro",
        tracking: "inside_out",
        requiresPC: false,
        requiresLighthouse: false,
    },
    {
        key: "htc_vive",
        name: "HTC VIVE",
        tracking: "lighthouse",
        requiresPC: true,
        requiresLighthouse: true,
    },
    {
        key: "htc_vive_pro",
        name: "HTC VIVE Pro",
        tracking: "lighthouse",
        requiresPC: true,
        requiresLighthouse: true,
    },
    {
        key: "htc_vive_pro_2",
        name: "HTC VIVE Pro 2",
        tracking: "lighthouse",
        requiresPC: true,
        requiresLighthouse: true,
    },
    {
        key: "valve_index",
        name: "Valve Index",
        tracking: "lighthouse",
        requiresPC: true,
        requiresLighthouse: true,
    },
    {
        key: "generic_inside_out",
        name: "Generic Inside-Out Headset",
        tracking: "inside_out",
        requiresPC: false,
        requiresLighthouse: false,
    },
    {
        key: "generic_lighthouse_based",
        name: "Generic Lighthouse-based Headset",
        tracking: "lighthouse",
        requiresPC: false,
        requiresLighthouse: true,
    },
] as const;

export const vrHeadsetsByKey = Object.fromEntries(vrHeadsets.map((h) => [h.key, h])) as Record<VRHeadsetKey, VRHeadset>;

/**
 * VR headset manufacturers
 */
export const vrHeadsetMakerKeys = ["meta", "htc", "valve", "other"] as const;

export type VRHeadsetMakerKey = (typeof vrHeadsetMakerKeys)[number];

type VRHeadsetMaker = {
    name: string;
    imageUrl?: string;
};

export const vrHeadsetMakers: Record<VRHeadsetMakerKey, VRHeadsetMaker> = {
    meta: {
        name: "Meta",
    },
    htc: {
        name: "HTC",
    },
    valve: {
        name: "Valve",
    },
    other: {
        name: "Other",
    },
} as const;

export const vrHeadsetsByMaker: Record<VRHeadsetMakerKey, VRHeadsetKey[]> = {
    meta: ["oculus_rift", "oculus_rift_s", "meta_quest_2", "meta_quest_3", "meta_quest_3s", "meta_quest_pro"],
    htc: ["htc_vive", "htc_vive_pro", "htc_vive_pro_2"],
    valve: ["valve_index"],
    other: ["generic_inside_out", "generic_lighthouse_based"],
} as const;
