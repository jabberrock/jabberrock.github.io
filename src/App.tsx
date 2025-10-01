import "./App.css";
import FBTTable from "./components/FBTTable";
import { Settings } from "./components/Settings";
import { OpacityContext } from "./components/VideoPlayer";
import { VRSystemPicker } from "./vr/VRSystemPicker";
import React from "react";
import { VRSystemSummary } from "./vr/VRSystemSummary";
import { FBTNav } from "./components/FBTNav";
import type { VRSystem } from "./vr/VR";

const opacityRef = { current: 0.9 };

function App() {
    const [vrSystem, setVRSystem] = React.useState<VRSystem | null>(null);

    // Load persisted VR system
    React.useEffect(() => {
        const savedResult = localStorage.getItem("vrSystem");
        if (savedResult) {
            setVRSystem(JSON.parse(savedResult));
        } else {
            setVRSystem({
                headset: "meta_quest_3",
                prefersPCVR: true,
            });
        }
    }, []);

    if (vrSystem) {
        return (
            <div className="main">
                <div className="sidebar">
                    <VRSystemSummary vrSystem={vrSystem} onReset={() => setVRSystem(null)} />
                    <FBTNav />
                </div>
                <div className="content">
                    <OpacityContext value={opacityRef}>
                        <FBTTable vrSystem={vrSystem} />
                        <Settings
                            onOpacityChange={(newOpacity) => {
                                opacityRef.current = newOpacity;
                            }}
                        />
                    </OpacityContext>
                </div>
            </div>
        );
    } else {
        return (
            <VRSystemPicker
                onComplete={(vrSystem) => {
                    localStorage.setItem("vrSystem", JSON.stringify(vrSystem));
                    setVRSystem(vrSystem);
                }}
            />
        );
    }
}

export default App;
