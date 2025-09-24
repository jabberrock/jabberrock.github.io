import React from "react"
import { VRHeadsetIcon } from "./VRHeadsetIcon";
import { vrHeadsetMakerKeys, vrHeadsetMakers, vrHeadsetsByKey, vrHeadsetsByMaker, type VRHeadsetKey, type VRSystem } from "./VR";

type QuestionnaireProps = {
    onComplete: (results: VRSystem) => any
}

type Step = "vr_headset" | "standalone" | "lighthouse" | "complete";

export const VRSystemPicker: React.FC<QuestionnaireProps> = ({
    onComplete
}) => {
    const [step, setStep] = React.useState<Step>("vr_headset");
    const [results, setResults] = React.useState<Partial<VRSystem>>({})

    function selectVRHeadset(vrHeadsetKey: VRHeadsetKey) {
        const newVRSystem: Partial<VRSystem> = {...results, headset: vrHeadsetKey };
        const vrHeadset = vrHeadsetsByKey[vrHeadsetKey];
        if (vrHeadset.requiresPC) {
            newVRSystem.prefersPCVR = true;
        }
        if (vrHeadset.requiresLighthouse) {
            newVRSystem.ownsLighthouse = true;
        }
        nextStep(newVRSystem);
    }

    function nextStep(newVRSystem: Partial<VRSystem>) {
        setResults(newVRSystem);
        
        if (!newVRSystem.headset) {
            setStep("vr_headset");
            return;
        }

        if (newVRSystem.prefersPCVR === undefined) {
            setStep("standalone");
            return;
        }

        if (newVRSystem.ownsLighthouse == undefined) {
            setStep("lighthouse");
            return;
        }

        setStep("complete");
        onComplete(newVRSystem as VRSystem);
    }

    switch (step) {
        case "vr_headset":
            return (
                <div className="questionnaire">
                    <p>Which VR headset do you own? (2 questions remaining)</p>
                    {vrHeadsetMakerKeys.map(makerKey => (
                        <div className="vr-headset-section" key={makerKey}>
                            <div className="manufacturer">{vrHeadsetMakers[makerKey].name}</div>
                            <div className="vr-headset-list">
                                {vrHeadsetsByMaker[makerKey].map(vrHeadset => (
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
                <div className="vrSystem">
                    <p>Will you use your VR headset standalone, or with a PC? (1 question remaining)</p>
                    <div>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            nextStep({...results, prefersPCVR: false, ownsLighthouse: false});
                        }}>
                            Standalone
                        </a>
                    </div>
                    <div>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            nextStep({...results, prefersPCVR: true});
                        }}>
                            PCVR
                        </a>
                    </div>
                </div>
            );

        case "lighthouse":
            return (
                <div className="vrSystem">
                    <p>Do you already own Lighthouse base stations?</p>
                    <div>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            nextStep({...results, ownsLighthouse: true});
                        }}>
                            Yes
                        </a>
                    </div>
                    <div>
                        <a href="#" onClick={e => {
                            e.preventDefault();
                            nextStep({...results, ownsLighthouse: false});
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