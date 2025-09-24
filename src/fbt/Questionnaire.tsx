import React from "react"
import { VRHeadsetIcon, type VRHeadsetKey } from "./VRHeadsetIcon";

export type VRStandalone = "standalone" | "pcvr";

export type QuestionnaireResult = {
    vrHeadset?: VRHeadsetKey
    standalone?: VRStandalone
    ownsLighthouse?: boolean
}

type QuestionnaireProps = {
    onComplete: (results: QuestionnaireResult) => any
}

type QuestionnaireStep = "vr_headset" | "standalone" | "lighthouse" | "complete";

type VRHeadsetDetail = {
    imageURL?: string
    fixedStandalone?: VRStandalone
    fixedOwnsLighthouse?: boolean
}

const vrHeadsetDetails: Record<VRHeadsetKey, VRHeadsetDetail> = {
    "oculus_rift": {
        fixedStandalone: "pcvr",
    },
    "oculus_rift_s": {
        fixedStandalone: "pcvr",
    },
    "meta_quest_2": {
    },
    "meta_quest_3": {
    },
    "meta_quest_3s": {
    },
    "meta_quest_pro": {
    },
    "htc_vive": {
        fixedStandalone: "pcvr",
        fixedOwnsLighthouse: true,
    },
    "htc_vive_pro": {
        fixedStandalone: "pcvr",
        fixedOwnsLighthouse: true,
    },
    "htc_vive_pro_2": {
        fixedStandalone: "pcvr",
        fixedOwnsLighthouse: true,
    },
    "valve_index": {
        fixedStandalone: "pcvr",
        fixedOwnsLighthouse: true,
    },
    "generic_inside_out": {
    },
    "generic_lighthouse_based": {
        fixedOwnsLighthouse: true,
    }
};

type VRHeadsetSection = {
    manufacturer: string
    vrHeadsets: VRHeadsetKey[]
}

const vrHeadsetSections: VRHeadsetSection[] = [
    {
        manufacturer: "Meta/Facebook",
        vrHeadsets: [
            "oculus_rift",
            "oculus_rift_s",
            "meta_quest_2",
            "meta_quest_3",
            "meta_quest_3s",
            "meta_quest_pro"
        ],
    },
    {
        manufacturer: "HTC",
        vrHeadsets: [
            "htc_vive",
            "htc_vive_pro",
            "htc_vive_pro_2"
        ],
    },
    {
        manufacturer: "Valve",
        vrHeadsets: [
            "valve_index"
        ],
    },
    {
        manufacturer: "Other",
        vrHeadsets: [
            "generic_inside_out",
            "generic_lighthouse_based"
        ]
    },
]

export const Questionnaire: React.FC<QuestionnaireProps> = ({
    onComplete
}) => {
    const [step, setStep] = React.useState<QuestionnaireStep>("vr_headset");
    const [results, setResults] = React.useState<QuestionnaireResult>({})

    function selectVRHeadset(vrHeadset: VRHeadsetKey) {
        const detail = vrHeadsetDetails[vrHeadset];
        const newResults = {...results, vrHeadset};
        if (detail.fixedStandalone) {
            newResults.standalone = detail.fixedStandalone;
        }
        if (detail.fixedOwnsLighthouse) {
            newResults.ownsLighthouse = detail.fixedOwnsLighthouse
        }
        setResults(newResults);
        nextStep(newResults);
    }

    function nextStep(newResults: QuestionnaireResult) {
        if (newResults.vrHeadset) {
            if (newResults.standalone) {
                if (Object.hasOwn(newResults, "ownsLighthouse")) {
                    setStep("complete");
                    onComplete(newResults);
                    localStorage.setItem("questionnaire", JSON.stringify(newResults));
                } else {
                    setStep("lighthouse");
                }
            } else {
                setStep("standalone");
            }
        } else {
            setStep("vr_headset");
        }
    }

    switch (step) {
        case "vr_headset":
            return (
                <div className="questionnaire">
                    <p>Which VR headset do you own? (2 questions remaining)</p>
                    {vrHeadsetSections.map(section => (
                        <div className="vr-headset-section" key={section.manufacturer}>
                            <div className="manufacturer">{section.manufacturer}</div>
                            <div className="vr-headset-list">
                                {section.vrHeadsets.map(vrHeadset => (
                                    <div key={vrHeadset}>
                                        <a href="#" onClick={e => { e.preventDefault(); selectVRHeadset(vrHeadset); }}>
                                            <VRHeadsetIcon headsetKey={vrHeadset} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );

        case "standalone":
            return (
                <div className="questionnaire">
                    <p>Will you use your VR headset standalone, or with a PC? (1 question remaining)</p>
                    <div>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            const newResults: QuestionnaireResult = {...results, standalone: "standalone", ownsLighthouse: false};
                            setResults(newResults);
                            nextStep(newResults);
                        }}>
                            Standalone
                        </a>
                    </div>
                    <div>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            const newResults: QuestionnaireResult = {...results, standalone: "pcvr"};
                            setResults(newResults);
                            nextStep(newResults);
                        }}>
                            PCVR
                        </a>
                    </div>
                </div>
            );

        case "lighthouse":
            return (
                <div className="questionnaire">
                    <p>Do you already own Lighthouse base stations?</p>
                    <div>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            const newResults: QuestionnaireResult = {...results, ownsLighthouse: true};
                            setResults(newResults);
                            nextStep(newResults);
                        }}>
                            Yes
                        </a>
                    </div>
                    <div>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            const newResults: QuestionnaireResult = {...results, ownsLighthouse: false};
                            setResults(newResults);
                            nextStep(newResults);
                        }}>
                            No
                        </a>
                    </div>
                </div>
            );

        case "complete":
            return (
                <>Questionnaire complete!</>
            );
    }
}