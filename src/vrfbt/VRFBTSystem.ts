import type React from "react";
import type { FBTSystemConfigKey } from "../fbt/FBT";

export type ReviewSection = {
    score: number;
    content: React.ReactNode;
    drawbacks?: Drawback[];
};

export type VRFBTReview = {
    cost: ReviewSection;
    setup: ReviewSection;
    calibration: ReviewSection;
    gameplay: ReviewSection;
    comfort: ReviewSection;
    overall: ReviewSection;
};

export type Drawback = {
    title: string;
    content: React.ReactNode;
    collapsed?: boolean;
};

export type VRFBTSystem = {
    key: FBTSystemConfigKey | "none";
    name: string;
    recommendation: React.ReactNode;
    videoWarning: React.ReactNode;
    introExample: React.ReactNode;
    howItWorks: React.ReactNode;
    review?: VRFBTReview;
    itemList: ItemList;
    availability: React.ReactNode;
    examples: {
        standing: React.ReactNode;
        sitting: React.ReactNode;
        sittingOnFloor: React.ReactNode;
        lyingDown: React.ReactNode;
        dancing: React.ReactNode;
        exercise: React.ReactNode;
    };
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
    updated: Date;
};

export const ExampleVideoKeys = [
    "standing",
    "sitting",
    "sitting_on_floor",
    "lying_down",
    "dancing",
    "exercise",
] as const;

export const defaultRecommendations: FBTSystemConfigKey[] = [
    "slimevr_trackers-enhanced_core_set_6_2",
    "htc_vive_trackers_3_0-3_trackers",
    "htc_vive_ultimate_trackers-3_trackers",
];

export function nonNullArray<T>(array: (T | undefined)[]): T[] {
    return array.filter((v) => v != null);
}

export function matchConfig<T>(key: FBTSystemConfigKey, values: Partial<Record<FBTSystemConfigKey, T>>): T {
    const v = values[key];
    if (v == undefined) {
        throw "Missing value";
    }

    return v;
}

export function matchConfigOptional<T>(
    key: FBTSystemConfigKey,
    values: Partial<Record<FBTSystemConfigKey, T>>,
    fallback?: T,
): T | undefined {
    return values[key] || fallback;
}
