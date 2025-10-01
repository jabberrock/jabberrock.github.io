import type React from "react";
import { vrHeadsetsByKey, type VRSystem } from "./VR";

type VRSystemSummaryProps = {
    vrSystem: VRSystem;
    onReset: () => any;
};

export const VRSystemSummary: React.FC<VRSystemSummaryProps> = ({ vrSystem, onReset }) => {
    const vrHeadset = vrHeadsetsByKey[vrSystem.headset];
    return (
        <div className="vr-system-summary">
            <div className="vr-system-summary-card">
                <img src={vrHeadset.imageURL} />
                <div>
                    <div>{vrHeadset.name}</div>
                    {!vrHeadset.requiresPC && (
                        <div>{vrSystem.prefersPCVR ? "PCVR" : "Standalone"}</div>
                    )}
                    <input
                        type="button"
                        value="Change Headset"
                        onClick={(e) => {
                            e.preventDefault();
                            onReset();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
