import type React from "react";
import type { FBTSystemConfigKey, FBTSystemKey } from "../fbt/FBT";
import { vrHeadsetKeys, vrHeadsetsByKey, type VRHeadsetKey } from "../vr/VR";

type ReviewSection = {
    score: number;
    content: React.ReactNode;
};

export type VRFBTReview = {
    cost: ReviewSection;
    tracking: ReviewSection;
    calibration: ReviewSection;
    overall: ReviewSection;
}

export type VRFBTSystem = {
    name: string;
    imageURL?: string;
    recommendation?: React.ReactNode;
    howItWorks?: React.ReactNode;
    itemList: ItemList;
    availability?: React.ReactNode;
    tracking?: React.ReactNode;
    specs?: React.ReactNode;
    introExample?: React.ReactNode;
    examples: Record<string, React.ReactNode>;
    drawbacks?: React.ReactNode;
    vrSession?: {
        setup: React.ReactNode;
        play: React.ReactNode;
    };
    review?: VRFBTReview;
};

export type Item = {
    name: string;
    comment?: string;
    count: number;
    each_price_cents: number;
    link: URL;
};

export type ItemList = {
    required: Item[];
    optional: Item[];
};

export const ExampleVideoKeys = [
    "standing",
    "sitting",
    "sitting_on_floor",
    "lying_down",
    "dancing",
    "exercise",
] as const;

export type FBTRecommendation = {
    system: FBTSystemKey;
    config: FBTSystemConfigKey;
};

const lighthouseFBTRecommendations: FBTRecommendation[] = [
    { system: "slimevr_trackers", config: "slimevr_trackers-enhanced_core_set_6_2" },
    { system: "htc_vive_trackers_3_0", config: "htc_vive_trackers_3_0-3_trackers" },
    { system: "htc_vive_ultimate_trackers", config: "htc_vive_ultimate-3_trackers" },
];

const nonLighthouseFBTRecommendations: FBTRecommendation[] = [
    { system: "slimevr_trackers", config: "slimevr_trackers-enhanced_core_set_6_2" },
    { system: "htc_vive_trackers_3_0", config: "htc_vive_trackers_3_0-3_trackers_1_continuous" },
    { system: "htc_vive_ultimate_trackers", config: "htc_vive_ultimate-3_trackers" },
];

export const vrHeadsetFBTRecommendations = Object.fromEntries(
    vrHeadsetKeys.map((v) => [
        v,
        vrHeadsetsByKey[v].tracking === "lighthouse" ? lighthouseFBTRecommendations : nonLighthouseFBTRecommendations,
    ]),
) as Record<VRHeadsetKey, FBTRecommendation[]>;
