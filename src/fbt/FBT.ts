export const fbtSystemKeys = ["slimevr_1_2", "htc_vive_3_0", "htc_vive_ultimate"] as const;

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
        key: "slimevr_1_2",
        name: "SlimeVR v1.2",
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
        key: "htc_vive_3_0",
        name: "HTC VIVE 3.0",
        configurations: [
            {
                key: "3_trackers",
                name: "3x HTC VIVE 3.0 trackers",
            },
            {
                key: "3_trackers_1_continuous",
                name: "3x HTC VIVE 3.0 trackers + 1x for continuous calibration",
            },
        ],
    },
    {
        key: "htc_vive_ultimate",
        name: "HTC VIVE Ultimate",
        configurations: [
            {
                key: "3_trackers",
                name: "3x HTC VIVE Ultimate trackers",
            },
        ],
    },
] as const;

export const fbtSystemsByKey = Object.fromEntries(fbtSystems.map((s) => [s.key, s])) as Record<FBTSystemKey, FBTSystem>;
