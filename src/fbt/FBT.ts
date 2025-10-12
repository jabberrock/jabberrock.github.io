export const fbtSystemKeys = ["slimevr_trackers", "htc_vive_trackers_3_0", "htc_vive_ultimate_trackers"] as const;

export type FBTSystemKey = (typeof fbtSystemKeys)[number];

export type FBTSystem = {
    key: FBTSystemKey;
    name: string;
    configurations: FBTSystemConfiguration[];
};

export type FBTSystemConfiguration = {
    key: string;
    name: string;
};

export const fbtSystems: FBTSystem[] = [
    {
        key: "slimevr_trackers",
        name: "SlimeVR Trackers",
        configurations: [
            {
                key: "lower_body_set_5_0",
                name: "SlimeVR Lower-Body Set (5 main trackers)",
            },
            {
                key: "core_set_6_0",
                name: "SlimeVR Core Set (6 main trackers)",
            },
            {
                key: "enhanced_core_set_6_2",
                name: "SlimeVR Enhanced Core Set (6 main + 2 extension trackers)",
            },
            {
                key: "full_body_set_8_2",
                name: "SlimeVR Full Body Set (8 main + 2 extension trackers)",
            },
        ],
    },
    {
        key: "htc_vive_trackers_3_0",
        name: "HTC VIVE Trackers 3.0",
        configurations: [
            {
                key: "3_trackers",
                name: "3x HTC VIVE Trackers 3.0",
            },
            {
                key: "3_trackers_1_continuous",
                name: "3x HTC VIVE Trackers 3.0 + 1x for continuous calibration",
            },
        ],
    },
    {
        key: "htc_vive_ultimate_trackers",
        name: "HTC VIVE Ultimate Trackers",
        configurations: [
            {
                key: "3_trackers",
                name: "3x HTC VIVE Ultimate Trackers",
            },
        ],
    },
] as const;

export const fbtSystemsByKey = Object.fromEntries(fbtSystems.map((s) => [s.key, s])) as Record<FBTSystemKey, FBTSystem>;
