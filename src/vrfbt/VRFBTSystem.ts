import type React from "react";
import type { FBTSystemKey } from "../fbt/FBT";
import { vrHeadsetKeys, vrHeadsetsByKey, type VRHeadsetKey } from "../vr/VR";

export type VRFBTSystem = {
    key: string;
    name: string;
    imageURL?: string;
    howItWorks?: React.ReactNode;
    itemList: ItemList;
    availability?: React.ReactNode;
    tracking?: React.ReactNode;
    specs?: React.ReactNode;
    examples: Record<string, React.ReactNode>;
    drawbacks?: React.ReactNode;
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
    "extreme",
] as const;

export type FBTRecommendation = {
    system: FBTSystemKey,
    config: string
};

const lighthouseFBTRecommendations: FBTRecommendation[] = [
    { system: "slimevr_1_2", config: "enhanced_core_set_6_2" },
    { system: "htc_vive_3_0", config: "3_trackers" },
    { system: "htc_vive_ultimate", config: "3_trackers" },
];

const nonLighthouseFBTRecommendations: FBTRecommendation[] = [
    { system: "slimevr_1_2", config: "enhanced_core_set_6_2" },
    { system: "htc_vive_3_0", config: "3_trackers_1_continuous" },
    { system: "htc_vive_ultimate", config: "3_trackers" },
];

export const vrHeadsetFBTRecommendations =
    Object.fromEntries(vrHeadsetKeys.map(v => [v, vrHeadsetsByKey[v].requiresLighthouse ? lighthouseFBTRecommendations : nonLighthouseFBTRecommendations])) as Record<VRHeadsetKey, FBTRecommendation[]>
