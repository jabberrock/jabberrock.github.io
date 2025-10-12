import React, { useContext, useState } from "react";
import { FBTSystemSelect, findFBTSystemOption, type FBTSystemConfigOption } from "./FBTSystemSelect";
import { makeSlimeVR } from "../vrfbt/SlimeVR";
import { makeHTCVive30 } from "../vrfbt/HTCVive30";
import { makeHTCViveUltimate } from "../vrfbt/HTCViveUltimate";
import type { VRSystem } from "../vr/VR";
import { vrHeadsetFBTRecommendations, type VRFBTSystem } from "../vrfbt/VRFBTSystem";
import { ColumnTableContext } from "./ColumnTable";

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

function makeEmptyVRFBTSystem(index: number): VRFBTSystem {
    return {
        key: `empty-${index}`,
        name: "",
        itemList: {
            required: [],
            optional: [],
        },
        examples: {}
    };
}

function FBTTable({ vrSystem }: FBTTableProps): React.ReactNode {
    const columnTableContext = useContext(ColumnTableContext);
    const [selectedOptions, setSelectedOptions] = useState<(FBTSystemConfigOption | null)[]>(
        vrHeadsetFBTRecommendations[vrSystem.headset].map((f) => findFBTSystemOption(f.system, f.config)),
    );

    const systems: VRFBTSystem[] = [];
    for (let i = 0; i < columnTableContext.numColumns; ++i) {
        let system = makeEmptyVRFBTSystem(i);
        if (i < selectedOptions.length) {
            const option = selectedOptions[i];
            if (option) {
                const { systemKey, configKey } = option.value;
                switch (systemKey) {
                    case "slimevr_trackers":
                        system = makeSlimeVR(vrSystem, configKey);
                        break;
                    case "htc_vive_trackers_3_0":
                        system = makeHTCVive30(vrSystem, configKey);
                        break;
                    case "htc_vive_ultimate_trackers":
                        system = makeHTCViveUltimate(vrSystem, configKey);
                        break;
                };
            }
        }
        systems.push(system);
    }

    function updateSelectedSystem(index: number, option: FBTSystemConfigOption | null) {
        const newOptions = [...selectedOptions];
        if (option) {
            for (let i = 0; i < newOptions.length; ++i) {
                if (newOptions[i] == option) {
                    newOptions[i] = null;
                }
            }
            newOptions[index] = option;
        } else {
            newOptions[index] = null;
        }
        setSelectedOptions(newOptions);
    }

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
                                onChange={(newValue) => updateSelectedSystem(i, newValue)}
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
                <tr id="section-recommendation">
                    {systems.map((system) => (
                        <td key={system.key}>{system.recommendation}</td>
                    ))}
                </tr>
                <tr className="header">
                    <td colSpan={systems.length}>Example</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.introExample}</td>
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
                    <td colSpan={systems.length}>Components</td>
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
                <tr id="section-availability" className="header">
                    <td colSpan={systems.length}>Availability</td>
                </tr>
                <tr>
                    {systems.map((system) => (
                        <td key={system.key}>{system.availability}</td>
                    ))}
                </tr>
                <tr id="section-examples" className="header">
                    <td colSpan={systems.length}>Tracking Examples</td>
                </tr>
                <tr>
                    <td colSpan={systems.length}>
                        <p>
                            These recordings show how accurately and smoothly each system translates my movements
                            into VR.
                        </p>
                        <p>
                            I recorded these examples with a real camera and a VRChat camera, then overlaid the two.
                            They represent the <strong>typical</strong> tracking I was able to achieve with good
                            calibration. I tried my best to avoid the limitations of each system (discussed in another
                            section below).
                        </p>
                    </td>
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
                    <td colSpan={systems.length}>Limitations</td>
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
