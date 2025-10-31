import "./App.css";
import FBTTable from "./components/FBTTable";
import { VRSystemPicker } from "./vr/VRSystemPicker";
import { VRSystemSummary } from "./vr/VRSystemSummary";
import { FBTNav } from "./components/FBTNav";
import { SelectedFBTs } from "./components/SelectedFBTs";
import { type VRHeadsetKey } from "./vr/VR";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ showPicker, vrHeadsetKey }: { showPicker?: boolean; vrHeadsetKey: VRHeadsetKey }) {
    const navigate = useNavigate();
    const [showVRHeadsetPicker, setShowVRHeadsetPicker] = useState(false);

    useEffect(() => {
        setShowVRHeadsetPicker(showPicker || false);
    }, [showPicker]);

    return (
        <SelectedFBTs vrHeadsetKey={vrHeadsetKey}>
            <div className="main">
                <div className="sidebar">
                    <VRSystemSummary vrHeadsetKey={vrHeadsetKey} onClick={() => setShowVRHeadsetPicker(true)} />
                    <VRSystemPicker
                        show={showVRHeadsetPicker}
                        onComplete={(vrHeadsetKey) => {
                            if (vrHeadsetKey) {
                                window.scrollTo(0, 0);
                                navigate(`/${vrHeadsetKey}/`);
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

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home showPicker vrHeadsetKey="meta_quest" />} />
            <Route path="/meta_quest/" element={<Home vrHeadsetKey="meta_quest" />} />
            <Route path="/valve_index/" element={<Home vrHeadsetKey="valve_index" />} />
            <Route path="/htc_vive/" element={<Home vrHeadsetKey="htc_vive" />} />
            <Route path="/oculus_rift/" element={<Home vrHeadsetKey="oculus_rift" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
