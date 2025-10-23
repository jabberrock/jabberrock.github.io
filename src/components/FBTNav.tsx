import React from "react";
import { useContext } from "react";
import { SelectedFBTsContext } from "./SelectedFBTs";

export const FBTNav: React.FC = () => {
    const { selected: selectedFBTs } = useContext(SelectedFBTsContext);

    return (
        <nav>
            <ul>
                <li>
                    <a href="#section-how_it_works">How it works</a>
                </li>
                <li>
                    <a href="#section-review">Review</a>
                    <ul>
                        <li>
                            <a href="#section-review-cost">Affordability</a>
                        </li>
                        <li>
                            <a href="#section-review-tracking">Tracking Accuracy</a>
                        </li>
                        <li>
                            <a href="#section-review-calibration">Ease of Calibration</a>
                        </li>
                        <li>
                            <a href="#section-review-overall">Overall</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#section-examples">Demos</a>
                    <ul>
                        <li>
                            <a href="#section-examples-wearing">Wearing</a>
                        </li>
                        <li>
                            <a href="#section-examples-calibration">Calibration</a>
                        </li>
                        <li>
                            <a href="#section-examples-standing">Standing</a>
                        </li>
                        <li>
                            <a href="#section-examples-sitting">Sitting</a>
                        </li>
                        <li>
                            <a href="#section-examples-sitting_on_floor">Sitting on Floor</a>
                        </li>
                        <li>
                            <a href="#section-examples-lying_down">Lying Down</a>
                        </li>
                        <li>
                            <a href="#section-examples-dancing">Dancing</a>
                        </li>
                        <li>
                            <a href="#section-examples-exercise">Exercise</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#section-drawbacks">Limitations</a>
                    <ul>
                        {selectedFBTs.map((fbt, i) =>
                            fbt && fbt.key !== "none" ? (
                                <li key={i}>
                                    {fbt.name}
                                    <ul>
                                        {fbt.drawbacks.map((d) => (
                                            <li key={d.key}>
                                                <a href={`#section-drawbacks-${fbt.key}-${d.key}`}>{d.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ) : (
                                <React.Fragment key={i}></React.Fragment>
                            ),
                        )}
                    </ul>
                </li>
                <li>
                    <a href="#section-availability">Availability</a>
                </li>
                <li>
                    <a href="#section-specifications">Specifications</a>
                </li>
            </ul>
        </nav>
    );
};
