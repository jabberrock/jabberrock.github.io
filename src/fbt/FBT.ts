/**
 * FBT System
 */

export const fbtSystemKeys = ["slimevr_trackers", "htc_vive_trackers_3_0", "htc_vive_ultimate_trackers"] as const;

export type FBTSystemKey = (typeof fbtSystemKeys)[number];

type FBTSystem = {
    key: FBTSystemKey,
    name: string
};

export const fbtSystems: FBTSystem[] = [
    {
        key: "slimevr_trackers",
        name: "SlimeVR",
    },
    {
        key: "htc_vive_trackers_3_0",
        name: "VIVE Tracker 3.0",
    },
    {
        key: "htc_vive_ultimate_trackers",
        name: "VIVE Ultimate",
    },
];

export const fbtSystemsByKey = 
    Object.fromEntries(fbtSystems.map((h) => [h.key, h])) as Record<FBTSystemKey, FBTSystem>;

/**
 * FBT System Configurations
 */

export const fbtSystemConfigKeys = [
    "slimevr_trackers-lower_body_set_5_0",
    "slimevr_trackers-core_set_6_0",
    "slimevr_trackers-enhanced_core_set_6_2",
    "slimevr_trackers-full_body_set_8_2",
    "htc_vive_trackers_3_0-3_trackers",
    "htc_vive_trackers_3_0-3_trackers_1_continuous",
    "htc_vive_ultimate-3_trackers",
] as const;

export type FBTSystemConfigKey = (typeof fbtSystemConfigKeys)[number];

type FBTSystemConfig = {
    key: FBTSystemConfigKey
    shortKey: string
    fbtSystemKey: FBTSystemKey
    name: string
}

export const fbtSystemConfigs: FBTSystemConfig[] = [
    {
        key: "slimevr_trackers-lower_body_set_5_0",
        shortKey: "lower_body_set_5_0",
        fbtSystemKey: "slimevr_trackers",
        name: "SlimeVR Lower-Body Set (5 main trackers)"
    },
    {
        key: "slimevr_trackers-core_set_6_0",
        shortKey: "core_set_6_0",
        fbtSystemKey: "slimevr_trackers",
        name: "SlimeVR Core Set (6 main trackers)",
    },
    {
        key: "slimevr_trackers-enhanced_core_set_6_2",
        shortKey: "enhanced_core_set_6_2",
        fbtSystemKey: "slimevr_trackers",
        name: "SlimeVR Enhanced Core Set (6 main + 2 extension trackers)",
    },
    {
        key: "slimevr_trackers-full_body_set_8_2",
        shortKey: "full_body_set_8_2",
        fbtSystemKey: "slimevr_trackers",
        name: "SlimeVR Full Body Set (8 main + 2 extension trackers)",
    },
    {
        key: "htc_vive_trackers_3_0-3_trackers",
        shortKey: "3_trackers",
        fbtSystemKey: "htc_vive_trackers_3_0",
        name: "VIVE Tracker 3.0 x3",
    },
    {
        key: "htc_vive_trackers_3_0-3_trackers_1_continuous",
        shortKey: "3_trackers_1_continuous",
        fbtSystemKey: "htc_vive_trackers_3_0",
        name: "VIVE Tracker 3.0 x3 + 1x for continuous calibration",
    },
    {
        key: "htc_vive_ultimate-3_trackers",
        shortKey: "3_trackers",
        fbtSystemKey: "htc_vive_ultimate_trackers",
        name: "VIVE Ultimate x3",
    },
];

export const fbtSystemConfigsByKey =
    Object.fromEntries(fbtSystemConfigs.map((h) => [h.key, h])) as Record<FBTSystemConfigKey, FBTSystemConfig>;
