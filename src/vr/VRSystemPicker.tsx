import React from "react";
import { VRHeadsetIcon } from "./VRHeadsetIcon";
import { type VRHeadsetKey } from "./VR";
import { Button, Modal } from "react-bootstrap";

const realVRHeadsetKeys: VRHeadsetKey[] = ["meta_quest", "valve_index", "htc_vive", "oculus_rift"];

const genericVRHeadsetKeys: VRHeadsetKey[] = ["generic_inside_out", "generic_lighthouse_based"];

type VRSystemPickerProps = {
    show: boolean;
    onComplete: (vrHeadsetKey: VRHeadsetKey | undefined) => any;
};

function VRHeadsetButton({
    vrHeadsetKey,
    onClick,
}: {
    vrHeadsetKey: VRHeadsetKey;
    onClick: (vrHeadsetKey: VRHeadsetKey) => any;
}) {
    return (
        <a
            href="#"
            key={vrHeadsetKey}
            onClick={(e) => {
                e.preventDefault();
                onClick(vrHeadsetKey);
            }}
            className="vr-headset text-center p-2 me-2 mb-2 border"
        >
            <VRHeadsetIcon headsetKey={vrHeadsetKey} />
        </a>
    );
}

export const VRSystemPicker: React.FC<VRSystemPickerProps> = ({ show, onComplete }) => {
    return (
        <Modal show={show} centered dialogClassName="vr-system-picker">
            <Modal.Header closeButton onHide={() => onComplete(undefined)}>
                <Modal.Title>Which VR headset do you have?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-wrap align-items-stretch">
                    {realVRHeadsetKeys.map((vrHeadsetKey) => (
                        <VRHeadsetButton vrHeadsetKey={vrHeadsetKey} onClick={onComplete} />
                    ))}
                </div>
                <div className="d-flex align-items-stretch">
                    {genericVRHeadsetKeys.map((vrHeadsetKey) => (
                        <VRHeadsetButton vrHeadsetKey={vrHeadsetKey} onClick={onComplete} />
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onComplete(undefined)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
