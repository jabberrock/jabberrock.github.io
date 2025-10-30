import React from "react";
import { VRHeadsetIcon } from "./VRHeadsetIcon";
import { vrHeadsetMakerKeys, vrHeadsetMakers, vrHeadsetsByMaker, type VRHeadsetKey } from "./VR";
import { Button, Modal } from "react-bootstrap";

type VRSystemPickerProps = {
    show: boolean;
    onComplete: (vrHeadsetKey: VRHeadsetKey | undefined) => any;
};

export const VRSystemPicker: React.FC<VRSystemPickerProps> = ({ show, onComplete }) => {
    return (
        <Modal show={show}>
            <Modal.Header closeButton onHide={() => onComplete(undefined)}>
                <Modal.Title>Which VR headset do you have?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="vr-system-picker">
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
                                                onComplete(vrHeadset);
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onComplete(undefined)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
