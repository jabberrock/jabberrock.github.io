import type React from "react";
import { VRHeadsetIcon } from "./VRHeadsetIcon";
import type { VRSystem } from "./VR";

type VRSystemSummaryProps = {
    vrSystem: VRSystem;
    onReset: () => any;
};

export const VRSystemSummary: React.FC<VRSystemSummaryProps> = ({ vrSystem, onReset }) => {
    return (
        <>
            <div>Which VR headset do you own?</div>
            <div>
                <VRHeadsetIcon headsetKey={vrSystem.headset} />
            </div>
            <br />
            <div>Will you use it standalone or PCVR?</div>
            <div>{vrSystem.prefersPCVR ? "PCVR" : "Standalone"}</div>
            <br />
            <input
                type="button"
                value="Change Headset"
                onClick={(e) => {
                    e.preventDefault();
                    onReset();
                }}
            />
        </>
    );
};
