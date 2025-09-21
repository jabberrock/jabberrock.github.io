import React from "react"

export type VRHeadset =
    "oculus_rift" | "oculus_rift_s" |
    "meta_quest_2" | "meta_quest_3" | "meta_quest_3s" | "meta_quest_pro" |
    "htc_vive" | "htc_vive_pro" | "htc_vive_pro_2" |
    "valve_index" |
    "generic_inside_out" | "generic_lighthouse_based";

export type VRStandalone = "standalone" | "pcvr";

export type QuestionnaireResult = {
    vrHeadset?: VRHeadset
    standalone?: VRStandalone
    ownsLighthouse?: boolean
}

type QuestionnaireProps = {
    onComplete: (results: QuestionnaireResult) => any
}

type QuestionnaireStep = "vr_headset" | "standalone" | "lighthouse" | "complete";

type VRHeadsetDetail = {
    name: string
    imageURL: string
    fixedStandalone?: VRStandalone
    fixedOwnsLighthouse?: boolean
}

const vrHeadsetDetails: Record<VRHeadset, VRHeadsetDetail> = {
    "oculus_rift": {
        name: "Oculus Rift",
        imageURL: "",
        fixedStandalone: "pcvr",
    },
    "oculus_rift_s": {
        name: "Oculus Rift S",
        imageURL: "",
        fixedStandalone: "pcvr",
    },
    "meta_quest_2": {
        name: "Meta Quest 2",
        imageURL: "",
    },
    "meta_quest_3": {
        name: "Meta Quest 3",
        imageURL: "",
    },
    "meta_quest_3s": {
        name: "Meta Quest 3S",
        imageURL: "",
    },
    "meta_quest_pro": {
        name: "Meta Quest Pro",
        imageURL: "",
    },
    "htc_vive": {
        name: "HTC VIVE",
        imageURL: "",
        fixedStandalone: "pcvr",
        fixedOwnsLighthouse: true,
    },
    "htc_vive_pro": {
        name: "HTC VIVE Pro",
        imageURL: "",
        fixedStandalone: "pcvr",
        fixedOwnsLighthouse: true,
    },
    "htc_vive_pro_2": {
        name: "HTC VIVE Pro 2",
        imageURL: "",
        fixedStandalone: "pcvr",
        fixedOwnsLighthouse: true,
    },
    "valve_index": {
        name: "Valve Index",
        imageURL: "",
        fixedStandalone: "pcvr",
        fixedOwnsLighthouse: true,
    },
    "generic_inside_out": {
        name: "Generic Inside-Out VR Headset",
        imageURL: "",
    },
    "generic_lighthouse_based": {
        name: "Generic Lighthouse-based VR Headset",
        imageURL: "",
        fixedOwnsLighthouse: true,
    }
};

export const Questionnaire: React.FC<QuestionnaireProps> = ({
    onComplete
}) => {
    const [step, setStep] = React.useState<QuestionnaireStep>("vr_headset");
    const [results, setResults] = React.useState<QuestionnaireResult>({})

    function nextStep(newResults: QuestionnaireResult) {
        if (newResults.vrHeadset) {
            if (newResults.standalone) {
                if (Object.hasOwn(newResults, "ownsLighthouse")) {
                    setStep("complete");
                    onComplete(newResults);
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
                <>
                    <p>Which VR headset do you own?</p>
                    {(Object.keys(vrHeadsetDetails) as Array<VRHeadset>).map(vrHeadset => (
                        <div key={vrHeadset}>
                            <a href="#" onClick={e => {
                                e.preventDefault();
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
                            }}>
                                <div>{vrHeadsetDetails[vrHeadset].name}</div>
                                <img src={vrHeadsetDetails[vrHeadset].imageURL} />
                            </a>
                        </div>
                    ))}
                </>
            );

        case "standalone":
            return (
                <>
                    <p>Will you use your VR headset standalone, or with a PC?</p>
                    <div>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            const newResults: QuestionnaireResult = {...results, standalone: "standalone"};
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
                </>
            );

        case "lighthouse":
            return (
                <>
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
                </>
            );

        case "complete":
            return (
                <>Questionnaire complete!</>
            );
    }
}