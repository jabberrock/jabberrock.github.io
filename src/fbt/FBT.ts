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
    imageURL: (config: string) => string
    howItWorks: (config: string) => React.ReactNode
    configs: Record<string, string>
    itemList: (config: string) => ItemList
    availability: (config: string) => React.ReactNode
    tracking: (config: string) => React.ReactNode
    specs: (config: string) => React.ReactNode
    examples: (config: string) => Record<string, React.ReactNode>
};

