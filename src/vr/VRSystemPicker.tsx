import React from "react";
import { VRHeadsetIcon } from "./VRHeadsetIcon";
import { vrHeadsetMakerKeys, vrHeadsetMakers, vrHeadsetsByMaker, type VRHeadsetKey, type VRSystem } from "./VR";

type VRSystemPickerProps = {
    onComplete: (results: VRSystem) => any;
};

type Step = "vr_headset" | "complete";

export const VRSystemPicker: React.FC<VRSystemPickerProps> = ({ onComplete }) => {
    const [step, setStep] = React.useState<Step>("vr_headset");
    const [results, setResults] = React.useState<Partial<VRSystem>>({});

    function selectVRHeadset(vrHeadsetKey: VRHeadsetKey) {
        const newVRSystem: Partial<VRSystem> = {
            ...results,
            headset: vrHeadsetKey,
        };
        nextStep(newVRSystem);
    }

    function nextStep(newVRSystem: Partial<VRSystem>) {
        setResults(newVRSystem);

        if (!newVRSystem.headset) {
            setStep("complete");
            return;
        }

        setStep("complete");
        onComplete(newVRSystem as VRSystem);
    }

    switch (step) {
        case "vr_headset":
            return (
                <div className="vr-system-picker">
                    <p>Which VR headset do you own?</p>
                    {vrHeadsetMakerKeys.map((makerKey) => (
                        <div className="vr-headset-section" key={makerKey}>
                            <div className="manufacturer">{vrHeadsetMakers[makerKey].name}</div>
                            <div className="vr-headset-list">
                                {vrHeadsetsByMaker[makerKey].map((vrHeadset) => (
                                    <div key={vrHeadset}>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                selectVRHeadset(vrHeadset);
                                            }}
                                        >
                                            <VRHeadsetIcon headsetKey={vrHeadset} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );

        case "complete":
            return <>Questionnaire complete!</>;
    }
};
