import React, { useState } from "react";
import { FBTSystemSelect, findFBTSystemOption, type FBTSystemConfigOption } from "./FBTSystemSelect";
import { makeSlimeVR } from "../vrfbt/SlimeVR";
import { makeHTCVive30 } from "../vrfbt/HTCVive30";
import { makeHTCViveUltimate } from "../vrfbt/HTCViveUltimate";
import type { VRSystem } from "../vr/VR";
import { vrHeadsetFBTRecommendations, type VRFBTSystem } from "../vrfbt/VRFBTSystem";

type FBTTableProps = {
    vrSystem: VRSystem;
};

const exampleVideos: Record<string, string> = {
    standing: "Standing",
    sitting: "Sitting",
    sitting_on_floor: "Sitting on Floor",
    lying_down: "Lying Down",
    dancing: "Dancing",
    exercise: "Exercise",
    extreme: "Extreme Movement",
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

function FBTTable({ vrSystem }: FBTTableProps): React.ReactNode {
    const [selectedOptions, setSelectedSystems] = useState<FBTSystemConfigOption[]>(
        vrHeadsetFBTRecommendations[vrSystem.headset].map((f) => findFBTSystemOption(f.system, f.config)),
    );

    const systems: VRFBTSystem[] = selectedOptions.map((s) => {
        switch (s.value.systemKey) {
            case "slimevr_1_2":
                return makeSlimeVR(vrSystem, s.value.configKey);
            case "htc_vive_3_0":
                return makeHTCVive30(vrSystem, s.value.configKey);
            case "htc_vive_ultimate":
                return makeHTCViveUltimate(vrSystem, s.value.configKey);
        }
    });

    return (
        <table className="fbt-table">
            <thead>
                <tr>
                    {systems.map((system) => (
                        <th key={system.key}>{system.name}</th>
                    ))}
                </tr>
                <tr>
                    {systems.map((system) => {
                        const priceCents = sum(system.itemList.required.map((i) => i.count * i.each_price_cents));
                        return (
                            <td key={system.key} className="price">
                                {toDollars(priceCents)}
                            </td>
                        );
                    })}
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={system.key}>
                            <FBTSystemSelect
                                selected={selectedOptions[i]}
                                onChange={(newValue) => {
                                    if (newValue && !selectedOptions.includes(newValue)) {
                                        const selected = [...selectedOptions];
                                        selected.splice(i, 1, newValue);
                                        setSelectedSystems(selected);
                                    }
                                }}
                            />
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>
                            <img src={system.imageURL} />
                        </td>
                    ))}
                </tr>
                <tr id="section-recommendation" className="header">
                    <td colSpan={systems.length}>Recommendation</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.recommendation}</td>
                    ))}
                </tr>
                <tr id="section-intro_example" className="header">
                    <td colSpan={systems.length}>Example</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.examples["dancing"]}</td>
                    ))}
                </tr>
                <tr id="section-how_it_works" className="header">
                    <td colSpan={systems.length}>How it Works</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.howItWorks}</td>
                    ))}
                </tr>
                <tr id="section-tracking" className="header">
                    <td colSpan={systems.length}>Tracking</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.tracking}</td>
                    ))}
                </tr>
                <tr id="section-components" className="header">
                    <td colSpan={systems.length}>Buying</td>
                </tr>
                <tr id="section-components-what" className="sub-header">
                    <td colSpan={systems.length}>What to Buy</td>
                </tr>
                <tr>
                    {systems.map((system) => {
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
                                                        <td>
                                                            <a href={item.link.toString()} target="_blank">
                                                                {item.name}
                                                            </a>{" "}
                                                            <span className="comment">{item.comment}</span>
                                                        </td>
                                                        <td>{item.count}x</td>
                                                        <td className="component-price">
                                                            {toDollars(item.each_price_cents)}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {Array(
                                                    systems.reduce(
                                                        (p, v) => Math.max(p, v.itemList.required.length),
                                                        0,
                                                    ) - itemList.required.length,
                                                )
                                                    .fill(null)
                                                    .map((_, i) => (
                                                        <tr key={i}>
                                                            <td colSpan={3}>&nbsp;</td>
                                                        </tr>
                                                    ))}
                                                <tr>
                                                    <td className="total" colSpan={3}>
                                                        {toDollars(
                                                            sum(
                                                                itemList.required.map(
                                                                    (i) => i.count * i.each_price_cents,
                                                                ),
                                                            ),
                                                        )}
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
                <tr>
                    {systems.map((system) => {
                        const itemList = system.itemList;
                        return (
                            <td key={system.key}>
                                <table className="component-table">
                                    <tbody>
                                        {itemList.optional.length > 0 && (
                                            <>
                                                <tr>
                                                    <td colSpan={3}>Recommended</td>
                                                </tr>
                                                {itemList.optional.map((item, i) => (
                                                    <tr key={i}>
                                                        <td>
                                                            <a href={item.link.toString()} target="_blank">
                                                                {item.name}
                                                            </a>{" "}
                                                            <span className="comment">{item.comment}</span>
                                                        </td>
                                                        <td>{item.count}x</td>
                                                        <td className="component-price">
                                                            {toDollars(item.each_price_cents)}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {Array(
                                                    systems.reduce(
                                                        (p, v) => Math.max(p, v.itemList.optional.length),
                                                        0,
                                                    ) - itemList.optional.length,
                                                )
                                                    .fill(null)
                                                    .map((_, i) => (
                                                        <tr key={i}>
                                                            <td colSpan={3}>&nbsp;</td>
                                                        </tr>
                                                    ))}
                                                <tr>
                                                    <td className="total" colSpan={3}>
                                                        {toDollars(
                                                            sum(
                                                                itemList.required.map(
                                                                    (i) => i.count * i.each_price_cents,
                                                                ),
                                                            ) +
                                                                sum(
                                                                    itemList.optional.map(
                                                                        (i) => i.count * i.each_price_cents,
                                                                    ),
                                                                ),
                                                        )}
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
                <tr id="section-components-where" className="sub-header">
                    <td colSpan={systems.length}>Where to Buy</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.availability}</td>
                    ))}
                </tr>
                <tr id="section-examples" className="header">
                    <td colSpan={systems.length}>Examples</td>
                </tr>
                {Object.keys(exampleVideos).map((v) => (
                    <React.Fragment key={v}>
                        <tr id={`section-examples-${v}`} className="sub-header">
                            <td colSpan={systems.length}>{exampleVideos[v]}</td>
                        </tr>
                        <tr>
                            {systems.map((system) => (
                                <td key={system.key}>{system.examples[v]}</td>
                            ))}
                        </tr>
                    </React.Fragment>
                ))}
                <tr id="section-drawbacks" className="header">
                    <td colSpan={systems.length}>Drawbacks</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.drawbacks}</td>
                    ))}
                </tr>
                <tr id="section-vrSession" className="header">
                    <td colSpan={systems.length}>Typical VR Session</td>
                </tr>
                <tr id={`section-vrSession-setup`} className="sub-header">
                    <td colSpan={systems.length}>Setup</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.vrSession?.setup}</td>
                    ))}
                </tr>
                <tr id={`section-vrSession-play`} className="sub-header">
                    <td colSpan={systems.length}>Play</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.vrSession?.play}</td>
                    ))}
                </tr>
                <tr id="section-specifications" className="header">
                    <td colSpan={systems.length}>Specifications</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.specs}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}

export default FBTTable;
