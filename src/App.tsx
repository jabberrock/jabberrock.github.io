import "./App.css";
import FBTTable from "./components/FBTTable";
import { VRSystemPicker } from "./vr/VRSystemPicker";
import React from "react";
import { VRSystemSummary } from "./vr/VRSystemSummary";
import { FBTNav } from "./components/FBTNav";
import { SelectedFBTs } from "./components/SelectedFBTs";
import { vrHeadsetKeys, type VRHeadsetKey } from "./vr/VR";

function App() {
    const [vrHeadsetKey, setVRHeadsetKey] = React.useState<VRHeadsetKey>("meta_quest");
    const [showVRHeadsetPicker, setShowVRHeadsetPicker] = React.useState(false);

    React.useEffect(() => {
        const savedResult = localStorage.getItem("vrHeadsetKey");
        if (savedResult && (vrHeadsetKeys as ReadonlyArray<string>).includes(savedResult)) {
            setVRHeadsetKey(savedResult as VRHeadsetKey);
        } else {
            setShowVRHeadsetPicker(true);
        }
    }, []);

    return (
        <SelectedFBTs vrHeadsetKey={vrHeadsetKey}>
            <div className="main">
                <div className="sidebar">
                    <VRSystemSummary vrHeadsetKey={vrHeadsetKey} onClick={() => setShowVRHeadsetPicker(true)} />
                    <VRSystemPicker
                        show={showVRHeadsetPicker}
                        onComplete={(vrHeadsetKey) => {
                            if (vrHeadsetKey) {
                                localStorage.setItem("vrHeadsetKey", vrHeadsetKey);
                                setVRHeadsetKey(vrHeadsetKey);
                                window.scrollTo(0, 0);
                            }
                            setShowVRHeadsetPicker(false);
                        }}
                    />
                    <FBTNav />
                </div>
                <div className="content">
                    <FBTTable />
                </div>
            </div>
        </SelectedFBTs>
    );
}

export default App;
