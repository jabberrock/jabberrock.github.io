import type React from "react";
import ScrollSpy from "react-scrollspy-navigation";

const sections: Record<string, string> = {
    "#section-how_it_works": "How it works",
    "#section-intro_example": "Example",
    "#section-components": "Components",
    "#section-availability": "Availability",
    "#section-tracking": "Tracking",
    "#section-specifications": "Specifications",
    "#section-examples": "Examples",
};

export const FBTNav: React.FC = () => {
    return (
        <ScrollSpy activeClass="selected" behavior="smooth">
            <nav>
                <ul>
                    {Object.keys(sections).map(section => (
                        <li key={section}>
                            <a href={section}>
                                {sections[section]}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </ScrollSpy>
    );
};
