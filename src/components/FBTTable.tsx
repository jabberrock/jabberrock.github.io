import React, { useContext } from "react";
import { FBTSystemSelect } from "./FBTSystemSelect";
import { type ReviewSection, type VRFBTReview, type VRFBTSystem } from "../vrfbt/VRFBTSystem";
import { ReviewScore } from "./ReviewScore";
import { SelectedFBTsContext } from "./SelectedFBTs";

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
        key: "none",
        name: "",
        itemList: {
            required: [],
            optional: [],
        },
        examples: {},
        drawbacks: [],
    };
}

function VRFBTReviewChart({ review }: { review: VRFBTReview }) {
    return (
        <table className="review-table">
            <tbody>
                <tr>
                    <td>Affordability</td>
                    <td>
                        <ReviewScore score={review.cost.score} />
                    </td>
                </tr>
                <tr>
                    <td>Setup</td>
                    <td>
                        <ReviewScore score={review.setup.score} />
                    </td>
                </tr>
                <tr>
                    <td>Calibration</td>
                    <td>
                        <ReviewScore score={review.calibration.score} />
                    </td>
                </tr>
                <tr>
                    <td>Gameplay</td>
                    <td>
                        <ReviewScore score={review.gameplay.score} />
                    </td>
                </tr>
                <tr>
                    <td>Comfort</td>
                    <td>
                        <ReviewScore score={review.comfort.score} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <strong>Overall</strong>
                    </td>
                    <td>
                        <ReviewScore score={review.overall.score} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

const VRFBTReviewSection = ({
    systems,
    id,
    name,
    section,
}: {
    systems: VRFBTSystem[];
    id: string;
    name: string;
    section: (system: VRFBTSystem) => ReviewSection | undefined;
}) => {
    return (
        <>
            <tr id={id}>
                <td colSpan={systems.length} className="sub-header">
                    {name}
                </td>
            </tr>
            <tr>
                {systems.map((system, i) =>
                    section(system) ? (
                        <td key={`${i}-${system.key}`}>
                            <ReviewScore score={section(system)?.score || 0} />
                        </td>
                    ) : (
                        <td key={`${i}-${system.key}`}></td>
                    ),
                )}
            </tr>
            <tr>
                {systems.map((system, i) => (
                    <td key={`${i}-${system.key}`}>{section(system)?.rating}</td>
                ))}
            </tr>
            <tr>
                {systems.map((system, i) => (
                    <td key={`${i}-${system.key}`}>
                        {section(system)?.content}
                        {section(system)?.drawbacks?.map((drawback) => (
                            <div key={drawback.key} className="drawback">
                                <div className="drawback-title">{drawback.title}</div>
                                {drawback.content}
                            </div>
                        ))}
                    </td>
                ))}
            </tr>
        </>
    );
};

function FBTTable(): React.ReactNode {
    const { selected, setSelected: updateSelectedSystem } = useContext(SelectedFBTsContext);
    const systems = selected.map((s) => s || makeEmptyVRFBTSystem());

    return (
        <table className="fbt-table">
            <thead>
                <tr>
                    {systems.map((system, i) => {
                        if (system.name) {
                            const priceCents = sum(system.itemList.required.map((i) => i.count * i.each_price_cents));
                            if (priceCents > 0) {
                                return (
                                    <th key={`${i}-${system.key}`}>
                                        {system.name} ({toDollars(priceCents)})
                                    </th>
                                );
                            } else {
                                return <th key={`${i}-${system.key}`}>{system.name}</th>;
                            }
                        } else {
                            return <th key={`${i}-${system.key}`}></th>;
                        }
                    })}
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>
                            <FBTSystemSelect
                                selected={system.key !== "none" ? system.key : null}
                                onChange={(option) => updateSelectedSystem(i, option?.value)}
                            />
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.recommendation}</td>
                    ))}
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.introExample}</td>
                    ))}
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>
                            {system.review && <VRFBTReviewChart review={system.review} />}
                        </td>
                    ))}
                </tr>
                <tr id="section-how_it_works">
                    <td colSpan={systems.length} className="header">
                        How it Works
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.howItWorks}</td>
                    ))}
                </tr>
                <tr id="section-review">
                    <td colSpan={systems.length} className="header">
                        Review
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>
                            {system.review && <VRFBTReviewChart review={system.review} />}
                        </td>
                    ))}
                </tr>
                <tr id="section-review-cost">
                    <td colSpan={systems.length} className="sub-header">
                        Affordability
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>
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
                            <td key={`${i}-${system.key}`}>
                                <table className="component-table">
                                    <tbody>
                                        {itemList.required.length > 0 && (
                                            <>
                                                <tr>
                                                    <td>Required</td>
                                                </tr>
                                                {itemList.required.map((item, i) => (
                                                    <tr key={`${i}-${system.key}`}>
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
                                                        <tr key={`${i}-${system.key}`}>
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
                <VRFBTReviewSection
                    systems={systems}
                    id="section-review-setup"
                    name="Setup"
                    section={(system) => system.review?.setup}
                />
                <VRFBTReviewSection
                    systems={systems}
                    id="section-review-calibration"
                    name="Calibration"
                    section={(system) => system.review?.calibration}
                />
                <VRFBTReviewSection
                    systems={systems}
                    id="section-review-gameplay"
                    name="Gameplay"
                    section={(system) => system.review?.gameplay}
                />
                <VRFBTReviewSection
                    systems={systems}
                    id="section-review-comfort"
                    name="Comfort"
                    section={(system) => system.review?.comfort}
                />
                <VRFBTReviewSection
                    systems={systems}
                    id="section-review-overall"
                    name="Overall"
                    section={(system) => system.review?.overall}
                />
                <tr id="section-examples">
                    <td colSpan={systems.length} className="header">
                        Demos
                    </td>
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
                <tr id="section-examples-wearing">
                    <td colSpan={systems.length} className="sub-header">
                        Wearing
                    </td>
                </tr>
                <tr>{/* TODO */}</tr>
                <tr id="section-examples-calibration">
                    <td colSpan={systems.length} className="sub-header">
                        Calibration
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.vrSession?.setup}</td>
                    ))}
                </tr>
                {Object.keys(exampleVideos).map((v) => (
                    <React.Fragment key={v}>
                        <tr id={`section-examples-${v}`}>
                            <td colSpan={systems.length} className="sub-header">
                                {exampleVideos[v]}
                            </td>
                        </tr>
                        <tr>
                            {systems.map((system, i) => (
                                <td key={`${i}-${system.key}`}>{system.examples[v]}</td>
                            ))}
                        </tr>
                    </React.Fragment>
                ))}
                <tr id="section-availability">
                    <td colSpan={systems.length} className="header">
                        Availability
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.availability}</td>
                    ))}
                </tr>
                <tr id="section-specifications">
                    <td colSpan={systems.length} className="header">
                        Specifications
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.specs}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}

export default FBTTable;
