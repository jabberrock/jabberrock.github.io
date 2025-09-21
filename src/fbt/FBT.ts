import type React from "react"

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

export type System = {
    key: string
    name: string
    configs: Record<string, string>
    itemList: (config: string) => ItemList
    availability: (config: string) => React.ReactNode
    tracking: (config: string) => React.ReactNode
    battery_life: (config: string) => React.ReactNode
    weight: (config: string) => React.ReactNode
    volume: (config: string) => React.ReactNode
    examples: (config: string) => Record<string, React.ReactNode>
};

