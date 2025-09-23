import React from "react";
import * as FBT from "./FBT"

type FBTTableProps = {
    systems: FBT.SpecializedSystem[]
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
    if (priceCents === 0) {
        return "--";
    } else {
        return `$${Math.round(priceCents / 100).toFixed()}`;
    }
}

function FBTTable({
    systems,
}: FBTTableProps): React.ReactNode {
    return (
        <table className="fbt-table">
            <thead>
                <tr>
                    {systems.map(system => (
                        <th key={system.key}>{system.name}</th>
                    ))}
                </tr>
                <tr>
                    {systems.map(system => {
                        const priceCents = sum(system.itemList.required.map(i => i.count * i.each_price_cents));
                        return (
                            <td key={system.key} className="price">{toDollars(priceCents)}</td>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {systems.map(system => (
                        <td key={system.key}>
                            <select defaultValue={system.config}>
                                {Object.keys(system.configs).map(c => (
                                    <option key={c} value={c}>{system.configs[c]}</option>
                                ))}
                            </select>
                        </td>
                    ))}
                </tr>
                <tr>
                    {systems.map(system => (
                        <td key={system.key}>
                            <img src={system.imageURL} />
                        </td>
                    ))}
                </tr>
                <tr id="section-how_it_works" className="header">
                    <td colSpan={systems.length}>How it Works</td>
                </tr>
                <tr>
                    {systems.map(system => (
                        <td key={system.key}>
                            {system.howItWorks}
                        </td>
                    ))}
                </tr>
                <tr id="section-intro_example" className="header">
                    <td colSpan={systems.length}>Example</td>
                </tr>
                <tr>
                    {systems.map(system => (
                        <td key={system.key}>
                            {system.examples["2_light_dancing"]}
                        </td>
                    ))}
                </tr>
                <tr id="section-components" className="header">
                    <td colSpan={systems.length}>Components</td>
                </tr>
                <tr>
                    {systems.map(system => {
                        const itemList = system.itemList;
                        return (
                            <td key={system.key}>
                                <table className="component-table">
                                    <tbody>
                                        {itemList.required.length > 0 && (
                                            <>
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
                                            </>
                                        )}
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
                <tr id="section-availability" className="header">
                    <td colSpan={systems.length}>Availability</td>
                </tr>
                <tr>
                    {systems.map(system => (
                        <td key={system.key}>
                            {system.availability}
                        </td>
                    ))}
                </tr>
                <tr id="section-tracking" className="header">
                    <td colSpan={systems.length}>Tracking</td>
                </tr>
                <tr>
                    {systems.map(system => (
                        <td key={system.key}>
                            {system.tracking}
                        </td>
                    ))}
                </tr>
                <tr id="section-specifications" className="header">
                    <td colSpan={systems.length}>Specifications</td>
                </tr>
                <tr>
                    {systems.map(system => (
                        <td key={system.key}>
                            {system.specs}
                        </td>
                    ))}
                </tr>
                <tr id="section-examples" className="header">
                    <td colSpan={systems.length}>Examples</td>
                </tr>
                {Object.keys(exampleVideos).map(v => (
                    <React.Fragment key={v}>
                        <tr className="sub-header">
                            <td colSpan={systems.length}>{exampleVideos[v]}</td>
                        </tr>
                        <tr>
                            {systems.map(system => (
                                <td key={system.key}>
                                    {system.examples[v]}
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
