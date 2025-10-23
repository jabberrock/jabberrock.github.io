import type React from "react";
import ScrollSpy from "../lib/react-scrollspy-navigation/ScrollSpy";

export const FBTNav: React.FC = () => {
    return (
        <ScrollSpy activeClass="selected" behavior="smooth" offsetTop={150}>
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
                    </li>
                    <li>
                        <a href="#section-availability">Availability</a>
                    </li>
                    <li>
                        <a href="#section-specifications">Specifications</a>
                    </li>
                </ul>
            </nav>
        </ScrollSpy>
    );
};
