import type React from "react";
import { vrHeadsetsByKey, type VRHeadsetKey } from "./VR";

type VRSystemSummaryProps = {
    vrHeadsetKey: VRHeadsetKey;
    onClick: () => any;
};

export const VRSystemSummary: React.FC<VRSystemSummaryProps> = ({ vrHeadsetKey, onClick }) => {
    const vrHeadset = vrHeadsetsByKey[vrHeadsetKey];
    return (
        <div className="vr-system-summary">
            <div className="vr-system-summary-card">
                <img src={vrHeadset.imageURL} />
                <div>
                    <div>{vrHeadset.name}</div>
                    <input
                        type="button"
                        value="Change Headset"
                        onClick={(e) => {
                            e.preventDefault();
                            onClick();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
