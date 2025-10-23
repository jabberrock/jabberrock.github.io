import React, { useContext, useState } from "react";
import { FBTSystemSelect, findFBTSystemOption, type FBTSystemConfigOption } from "./FBTSystemSelect";
import { makeSlimeVR } from "../vrfbt/SlimeVR";
import { makeHTCVive30 } from "../vrfbt/HTCVive30";
import { makeHTCViveUltimate } from "../vrfbt/HTCViveUltimate";
import type { VRSystem } from "../vr/VR";
import { vrHeadsetFBTRecommendations, type VRFBTReview, type VRFBTSystem } from "../vrfbt/VRFBTSystem";
import { ColumnTableContext } from "./ColumnTable";
import { ReviewScore } from "./ReviewScore";
import { fbtSystemConfigsByKey } from "../fbt/FBT";

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

function makeEmptyVRFBTSystem(): VRFBTSystem {
    return {
        name: "",
        itemList: {
            required: [],
            optional: [],
        },
        examples: {},
    };
}

function VRFBTReviewChart({ review }: { review: VRFBTReview }) {
    return (
        <table className="review-table">
            <tbody>
                <tr>
                    <td>
                        <strong>Overall</strong>
                    </td>
                    <td>
                        <ReviewScore score={review.overall.score} />
                    </td>
                </tr>
                <tr>
                    <td>Affordability</td>
                    <td>
                        <ReviewScore score={review.cost.score} />
                    </td>
                </tr>
                <tr>
                    <td>Tracking Accuracy</td>
                    <td>
                        <ReviewScore score={review.tracking.score} />
                    </td>
                </tr>
                <tr>
                    <td>Ease of Calibration</td>
                    <td>
                        <ReviewScore score={review.calibration.score} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

function FBTTable({ vrSystem }: FBTTableProps): React.ReactNode {
    const columnTableContext = useContext(ColumnTableContext);
    const [selectedOptions, setSelectedOptions] = useState<(FBTSystemConfigOption | null)[]>(
        vrHeadsetFBTRecommendations[vrSystem.headset].map((f) => findFBTSystemOption(f.config)),
    );

    const systems: VRFBTSystem[] = [];
    for (let i = 0; i < columnTableContext.numColumns; ++i) {
        let system = makeEmptyVRFBTSystem();
        if (i < selectedOptions.length) {
            const option = selectedOptions[i];
            if (option) {
                const configKey = option.value;
                switch (fbtSystemConfigsByKey[configKey].fbtSystemKey) {
                    case "slimevr_trackers":
                        system = makeSlimeVR(vrSystem, configKey);
                        break;
                    case "htc_vive_trackers_3_0":
                        system = makeHTCVive30(vrSystem, configKey);
                        break;
                    case "htc_vive_ultimate_trackers":
                        system = makeHTCViveUltimate(vrSystem, configKey);
                        break;
                }
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
                    {systems.map((system, i) => {
                        if (system.name) {
                            const priceCents = sum(system.itemList.required.map((i) => i.count * i.each_price_cents));
                            return (
                                <th key={i}>
                                    {system.name} ({toDollars(priceCents)})
                                </th>
                            );
                        } else {
                            return (
                                <th></th>
                            )
                        }
                    })}
                </tr>
                <tr>
                    {systems.map((_, i) => (
                        <td key={i}>
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
                    {systems.map((system, i) => (
                        <td key={i}>{system.recommendation}</td>
                    ))}
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>{system.introExample}</td>
                    ))}
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>{system.review && <VRFBTReviewChart review={system.review} />}</td>
                    ))}
                </tr>
                <tr id="section-how_it_works" className="header">
                    <td colSpan={systems.length}>How it Works</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>{system.howItWorks}</td>
                    ))}
                </tr>
                <tr id="section-review" className="header">
                    <td colSpan={systems.length}>Review</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>{system.review && <VRFBTReviewChart review={system.review} />}</td>
                    ))}
                </tr>
                <tr id="section-review-cost" className="sub-header">
                    <td colSpan={systems.length}>Affordability</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>
                            {system.review && (
                                <>
                                    <ReviewScore score={system.review.cost.score} />
                                    {system.review.cost.content}
                                </>
                            )}
                        </td>
                    ))}
                </tr>
                <tr>
                    {systems.map((system, i) => {
                        const itemList = system.itemList;
                        return (
                            <td key={i}>
                                <table className="component-table">
                                    <tbody>
                                        {itemList.required.length > 0 && (
                                            <>
                                                <tr>
                                                    <td>Required</td>
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
                <tr id="section-review-tracking" className="sub-header">
                    <td colSpan={systems.length}>Tracking Accuracy</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>
                            {system.review && (
                                <>
                                    <ReviewScore score={system.review.tracking.score} />
                                    {system.review.tracking.content}
                                </>
                            )}
                        </td>
                    ))}
                </tr>
                <tr id="section-review-calibration" className="sub-header">
                    <td colSpan={systems.length}>Ease of Calibration</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>
                            {system.review && (
                                <>
                                    <ReviewScore score={system.review.calibration.score} />
                                    {system.review.calibration.content}
                                </>
                            )}
                        </td>
                    ))}
                </tr>
                <tr id="section-review-overall" className="sub-header">
                    <td colSpan={systems.length}>Overall</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>
                            {system.review && (
                                <>
                                    <ReviewScore score={system.review.overall.score} />
                                    {system.review.overall.content}
                                </>
                            )}
                        </td>
                    ))}
                </tr>
                <tr id="section-examples" className="header">
                    <td colSpan={systems.length}>Demos</td>
                </tr>
                <tr>
                    <td colSpan={systems.length}>
                        <p>
                            These recordings show how accurately and smoothly each system translates my movements into
                            VR. They represent the <strong>typical</strong> tracking I was able to achieve with good
                            calibration.
                        </p>
                    </td>
                </tr>
                <tr id="section-examples-wearing" className="sub-header">
                    <td colSpan={systems.length}>Wearing</td>
                </tr>
                <tr>{/* TODO */}</tr>
                <tr id="section-examples-calibration" className="sub-header">
                    <td colSpan={systems.length}>Calibration</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>{system.vrSession?.setup}</td>
                    ))}
                </tr>
                {Object.keys(exampleVideos).map((v) => (
                    <React.Fragment key={v}>
                        <tr id={`section-examples-${v}`} className="sub-header">
                            <td colSpan={systems.length}>{exampleVideos[v]}</td>
                        </tr>
                        <tr>
                            {systems.map((system, i) => (
                                <td key={i}>{system.examples[v]}</td>
                            ))}
                        </tr>
                    </React.Fragment>
                ))}
                <tr id="section-drawbacks" className="header">
                    <td colSpan={systems.length}>Limitations</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>{system.drawbacks}</td>
                    ))}
                </tr>
                <tr id="section-availability" className="header">
                    <td colSpan={systems.length}>Availability</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>{system.availability}</td>
                    ))}
                </tr>
                <tr id="section-specifications" className="header">
                    <td colSpan={systems.length}>Specifications</td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={i}>{system.specs}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}

export default FBTTable;
