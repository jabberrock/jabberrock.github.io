import React, { useContext } from "react";
import { FBTSystemSelect } from "./FBTSystemSelect";
import { type ReviewSection, type VRFBTReview, type VRFBTSystem } from "../vrfbt/VRFBTSystem";
import { ReviewScore } from "./ReviewScore";
import { SelectedFBTsContext } from "./SelectedFBTs";
import { CollapsibleSection } from "./CollapsibleSection";

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
        recommendation: <></>,
        videoWarning: <></>,
        introExample: <></>,
        howItWorks: <></>,
        itemList: {
            required: [],
            optional: [],
        },
        availability: <></>,
        examples: {
            standing: <></>,
            sitting: <></>,
            sittingOnFloor: <></>,
            lyingDown: <></>,
            dancing: <></>,
            exercise: <></>,
        },
    };
}

function VRFBTReviewChart({ review }: { review: VRFBTReview }) {
    return (
        <table className="review-table">
            <tbody>
                <tr>
                    <td>Price</td>
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
                        <strong>My Overall Rating</strong>
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
    children,
}: {
    systems: VRFBTSystem[];
    id: string;
    name: string;
    section: (system: VRFBTSystem) => ReviewSection | undefined;
} & React.PropsWithChildren) => {
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
                    <td key={`${i}-${system.key}`}>
                        {section(system)?.content}
                        {section(system)?.drawbacks?.map((drawback, i) => (
                            <CollapsibleSection
                                key={i}
                                title={drawback.title}
                                className="drawback"
                                initiallyCollapsed={drawback.collapsed}
                            >
                                {drawback.content}
                            </CollapsibleSection>
                        ))}
                    </td>
                ))}
            </tr>
            {children}
        </>
    );
};

function ComponentTable({
    systems,
    system,
    showOptional = false,
}: {
    systems: VRFBTSystem[];
    system: VRFBTSystem;
    showOptional?: boolean;
}) {
    return (
        <table className="component-table">
            <tbody>
                {system.itemList.required.length > 0 && (
                    <>
                        <tr>
                            <td>Required</td>
                        </tr>
                        {system.itemList.required.map((item, i) => (
                            <tr key={`${i}-${system.key}`}>
                                <td>
                                    <a href={item.link.toString()} target="_blank">
                                        {item.name}
                                    </a>{" "}
                                    <span className="comment">{item.comment}</span>
                                </td>
                                <td>{item.count}x</td>
                                <td className="component-price">{toDollars(item.each_price_cents)}</td>
                            </tr>
                        ))}
                        {Array(
                            systems.reduce((p, v) => Math.max(p, v.itemList.required.length), 0) -
                                system.itemList.required.length,
                        )
                            .fill(null)
                            .map((_, i) => (
                                <tr key={`${i}-${system.key}`}>
                                    <td colSpan={3}>&nbsp;</td>
                                </tr>
                            ))}
                        <tr>
                            <td className="total" colSpan={3}>
                                <strong>
                                    {toDollars(sum(system.itemList.required.map((i) => i.count * i.each_price_cents)))}
                                </strong>
                            </td>
                        </tr>
                    </>
                )}
                {showOptional && system.itemList.optional.length > 0 && (
                    <>
                        <tr>
                            <td>Recommended</td>
                        </tr>
                        {system.itemList.optional.map((item, i) => (
                            <tr key={`${i}-${system.key}`}>
                                <td>
                                    <a href={item.link.toString()} target="_blank">
                                        {item.name}
                                    </a>{" "}
                                    <span className="comment">{item.comment}</span>
                                </td>
                                <td>{item.count}x</td>
                                <td className="component-price">{toDollars(item.each_price_cents)}</td>
                            </tr>
                        ))}
                        {Array(
                            systems.reduce((p, v) => Math.max(p, v.itemList.optional.length), 0) -
                                system.itemList.optional.length,
                        )
                            .fill(null)
                            .map((_, i) => (
                                <tr key={`${i}-${system.key}`}>
                                    <td colSpan={3}>&nbsp;</td>
                                </tr>
                            ))}
                        <tr>
                            <td className="total" colSpan={3}>
                                <strong>
                                    {toDollars(
                                        sum(system.itemList.required.map((i) => i.count * i.each_price_cents)) +
                                            sum(system.itemList.optional.map((i) => i.count * i.each_price_cents)),
                                    )}
                                </strong>
                            </td>
                        </tr>
                    </>
                )}
            </tbody>
        </table>
    );
}

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
                                    <td key={`${i}-${system.key}`} className="title">
                                        {system.name} ({toDollars(priceCents)})
                                    </td>
                                );
                            } else {
                                return <td key={`${i}-${system.key}`}>{system.name}</td>;
                            }
                        } else {
                            return <td key={`${i}-${system.key}`}></td>;
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
                        <td key={`${i}-${system.key}`} className="warning">
                            {system.videoWarning}
                        </td>
                    ))}
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.introExample}</td>
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
                <VRFBTReviewSection
                    systems={systems}
                    id="section-review-cost"
                    name="Price"
                    section={(system) => system.review?.cost}
                >
                    <tr>
                        {systems.map((system, i) => {
                            return (
                                <td key={`${i}-${system.key}`}>
                                    <ComponentTable systems={systems} system={system} />
                                </td>
                            );
                        })}
                    </tr>
                </VRFBTReviewSection>
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
                        <p>
                            I recorded each system in one take. I had calibrate a few times to match my avatar and IRL
                            body precisely. I also had to repeat certain actions until it wasn't affected by occlusion.
                        </p>
                    </td>
                </tr>
                <tr id={`section-examples-standing`}>
                    <td colSpan={systems.length} className="sub-header">
                        Standing
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.examples.standing}</td>
                    ))}
                </tr>
                <tr id={`section-examples-sitting`}>
                    <td colSpan={systems.length} className="sub-header">
                        Sitting
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.examples.sitting}</td>
                    ))}
                </tr>
                <tr id={`section-examples-sitting_on_floor`}>
                    <td colSpan={systems.length} className="sub-header">
                        Sitting on Floor
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.examples.sittingOnFloor}</td>
                    ))}
                </tr>
                <tr id={`section-examples-lying_down`}>
                    <td colSpan={systems.length} className="sub-header">
                        Lying Down
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.examples.lyingDown}</td>
                    ))}
                </tr>
                <tr id={`section-examples-dancing`}>
                    <td colSpan={systems.length} className="sub-header">
                        Dancing
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.examples.dancing}</td>
                    ))}
                </tr>
                <tr id={`section-examples-exercise`}>
                    <td colSpan={systems.length} className="sub-header">
                        Excercise
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.examples.exercise}</td>
                    ))}
                </tr>
                <tr id="section-buying">
                    <td colSpan={systems.length} className="header">
                        Buying
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => (
                        <td key={`${i}-${system.key}`}>{system.availability}</td>
                    ))}
                </tr>
                <tr id="section-what_to_buy">
                    <td colSpan={systems.length} className="sub-header">
                        What to Buy
                    </td>
                </tr>
                <tr>
                    {systems.map((system, i) => {
                        return (
                            <td key={`${i}-${system.key}`}>
                                <ComponentTable systems={systems} system={system} showOptional={true} />
                            </td>
                        );
                    })}
                </tr>
            </tbody>
        </table>
    );
}

export default FBTTable;
