import type React from "react"
import type { QuestionnaireResult } from "./Questionnaire"

export type Item = {
    name: string
    count: number
    each_price_cents: number
    link: URL
}

export type ItemList = {
    required: Item[]
    optional: Item[]
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

export const FBTSystemKeys = [
    "slimevr_1_2",
    "htc_vive_3_0",
    "htc_vive_ultimate",
] as const;

export type FBTSystemKey = typeof FBTSystemKeys[number];

export type System = {
    key: string
    name: string
    configs: Record<string, string>
    specialized: (config: string, questionnaireResult: QuestionnaireResult) => SpecializedSystem
};

export type SpecializedSystem = {
    key: string
    name: string
    config: string
    configs: Record<string, string>
    imageURL?: string
    howItWorks?: React.ReactNode
    itemList: ItemList
    availability?: React.ReactNode
    tracking?: React.ReactNode
    specs?: React.ReactNode
    examples: Record<string, React.ReactNode>
};