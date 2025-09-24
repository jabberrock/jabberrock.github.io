import type React from "react";
import ScrollSpy from "../lib/react-scrollspy-navigation/ScrollSpy";

export const FBTNav: React.FC = () => {
    return (
        <ScrollSpy root={document.documentElement} activeClass="selected" behavior="smooth" offsetTop={150}>
            <nav>
                <ul>
                    <li>
                        <a href="#section-how_it_works">How it works</a>
                    </li>
                    <li>
                        <a href="#section-intro_example">Example</a>
                    </li>
                    <li>
                        <a href="#section-components">Components</a>
                    </li>
                    <li>
                        <a href="#section-availability">Availability</a>
                    </li>
                    <li>
                        <a href="#section-tracking">Tracking</a>
                    </li>
                    <li>
                        <a href="#section-specifications">Specifications</a>
                    </li>
                    <li>
                        <a href="#section-examples">Examples</a>
                        <ul>
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
                            <li>
                                <a href="#section-examples-extreme">Extreme Movement</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </ScrollSpy>
    );
};
