import "./App.css";
import FBTTable from "./components/FBTTable";
import { Settings } from "./components/Settings";
import { OpacityContext } from "./components/VideoPlayer";
import { VRSystemPicker } from "./vr/VRSystemPicker";
import React from "react";
import { VRSystemSummary } from "./vr/VRSystemSummary";
import { FBTNav } from "./components/FBTNav";
import { ColumnTable } from "./components/ColumnTable";
import { SelectedFBTs } from "./components/SelectedFBTs";
import { vrHeadsetKeys, type VRHeadsetKey } from "./vr/VR";

const opacityRef = { current: 0.9 };

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
        <ColumnTable minColumns={1} maxColumns={4} columnWidth={500} sidebarWidth={300}>
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
                                }
                                setShowVRHeadsetPicker(false);
                            }}
                        />
                        <FBTNav />
                    </div>
                    <div className="content">
                        <OpacityContext value={opacityRef}>
                            <FBTTable />
                            <Settings
                                onOpacityChange={(newOpacity) => {
                                    opacityRef.current = newOpacity;
                                }}
                            />
                        </OpacityContext>
                    </div>
                </div>
            </SelectedFBTs>
        </ColumnTable>
    );
}

export default App;
