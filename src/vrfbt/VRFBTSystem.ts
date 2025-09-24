import type { VRSystem } from "../vr/VR"

export type System = {
    key: string
    name: string
    configs: Record<string, string>
    specialized: (config: string, vrSystem: VRSystem) => VRFBTSystem
};

export type VRFBTSystem = {
    key: string
    name: string
    imageURL?: string
    howItWorks?: React.ReactNode
    itemList: ItemList
    availability?: React.ReactNode
    tracking?: React.ReactNode
    specs?: React.ReactNode
    examples: Record<string, React.ReactNode>
};

export type Item = {
    name: string
    comment?: string
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
