import React, { useState } from "react";
import * as FBT from "./FBT"

type FBTTableChoice = {
    system: FBT.System
    config: string
}

type FBTTableProps = {
    initialChoices: FBTTableChoice[]
};

const exampleVideos: Record<string, string> = {
    "1_standing": "Standing",
    "2_light_dancing": "Light Dancing",
    "3_dynamic_movement": "Dyanmic Movement",
    "4_sitting": "Sitting",
    "5_lying_down": "Lying Down",
    "6_sitting_on_floor": "Sitting on Floor",
    "7_light_exercise": "Light Exercise",
};

function sum(prices: number[]) {
    return prices.reduce((a, v) => a + v, 0);
}

function toDollars(priceCents: number) {
    return `$${Math.round(priceCents / 100).toFixed()}`;
}

function FBTTable(props: FBTTableProps): React.ReactNode {
    const [ choices ] = useState(props.initialChoices);

    return (
        <table className="fbt-table">
            <thead>
                <tr>
                    {choices.map(({ system }) => (
                        <th key={system.key}>{system.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {choices.map(({ system, config }) => (
                        <td key={system.key}>
                            <select defaultValue={config}>
                                {Object.keys(system.configs).map(c => (
                                    <option key={c} value={c}>{system.configs[c]}</option>
                                ))}
                            </select>
                        </td>
                    ))}
                </tr>
                <tr>
                    {choices.map(({ system, config }) => {
                        const itemList = system.itemList(config);
                        const priceCents = sum(itemList.required.map(i => i.count * i.each_price_cents));
                        return (
                            <td key={system.key} className="price">{toDollars(priceCents)}</td>
                        );
                    })}
                </tr>
                <tr>
                    {choices.map(({ system, config }) => (
                        <td key={system.key}>
                            <img src={system.imageURL(config)} />
                        </td>
                    ))}
                </tr>
                <tr className="header">
                    <td colSpan={choices.length}>How it Works</td>
                </tr>
                <tr>
                    {choices.map(({ system, config }) => (
                        <td key={system.key}>
                            {system.howItWorks(config)}
                        </td>
                    ))}
                </tr>
                <tr className="header">
                    <td colSpan={choices.length}>Example</td>
                </tr>
                <tr>
                    {choices.map(({ system, config }) => (
                        <td key={system.key}>
                            {system.examples(config)["2_light_dancing"]}
                        </td>
                    ))}
                </tr>
                <tr className="header">
                    <td colSpan={choices.length}>Recommended Parts</td>
                </tr>
                <tr>
                    {choices.map(({ system, config }) => {
                        const itemList = system.itemList(config);
                        return (
                            <td key={system.key}>
                                <table className="component-table">
                                    <tbody>
                                        <tr>
                                            <td colSpan={3}>Required</td>
                                        </tr>
                                        {itemList.required.map((item, i) => (
                                            <tr key={i}>
                                                <td><a href={item.link.toString()} target="_blank">{item.name}</a></td>
                                                <td>{item.count}x</td>
                                                <td className="component-price">{toDollars(item.each_price_cents)}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="total" colSpan={3}>
                                                {toDollars(sum(itemList.required.map(i => i.count * i.each_price_cents)))}
                                            </td>
                                        </tr>
                                        {itemList.optional.length > 0 && (
                                            <>
                                                <tr>
                                                    <td colSpan={3}>Recommended</td>
                                                </tr>
                                                {itemList.optional.map((item, i) => (
                                                    <tr key={i}>
                                                        <td><a href={item.link.toString()} target="_blank">{item.name}</a></td>
                                                        <td>{item.count}x</td>
                                                        <td className="component-price">{toDollars(item.each_price_cents)}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td className="total" colSpan={3}>
                                                        {toDollars(sum(itemList.required.map(i => i.count * i.each_price_cents)) +
                                                            sum(itemList.optional.map(i => i.count * i.each_price_cents)))}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </td>
                        );
                    })}
                </tr>
                <tr className="header">
                    <td colSpan={choices.length}>Availability</td>
                </tr>
                <tr>
                    {choices.map(({ system, config }) => (
                        <td key={system.key}>
                            {system.availability(config)}
                        </td>
                    ))}
                </tr>
                <tr className="header">
                    <td colSpan={choices.length}>Tracking</td>
                </tr>
                <tr>
                    {choices.map(({ system, config }) => (
                        <td key={system.key}>
                            {system.tracking(config)}
                        </td>
                    ))}
                </tr>
                <tr className="header">
                    <td colSpan={choices.length}>Specifications</td>
                </tr>
                <tr>
                    {choices.map(({ system, config }) => (
                        <td key={system.key}>
                            {system.specs(config)}
                        </td>
                    ))}
                </tr>
                <tr className="header">
                    <td colSpan={choices.length}>Examples</td>
                </tr>
                {Object.keys(exampleVideos).map(v => (
                    <React.Fragment key={v}>
                        <tr>
                            <td colSpan={choices.length}>{exampleVideos[v]}</td>
                        </tr>
                        <tr>
                            {choices.map(({ system, config }) => (
                                <td key={system.key}>
                                    {system.examples(config)[v]}
                                </td>
                            ))}
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}

export default FBTTable;
