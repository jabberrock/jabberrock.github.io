import "./App.css";
import FBTTable from "./components/FBTTable";
import { VRSystemPicker } from "./vr/VRSystemPicker";
import { VRSystemSummary } from "./vr/VRSystemSummary";
import { FBTNav } from "./components/FBTNav";
import { SelectedFBTs } from "./components/SelectedFBTs";
import { vrHeadsetKeys, type VRHeadsetKey } from "./vr/VR";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RouteRecord } from "vite-react-ssg";

export const routes: RouteRecord[] = [
    {
        path: "/",
        element: <Home showPicker vrHeadsetKey="meta_quest" />,
    },
    ...vrHeadsetKeys.map((vrHeadsetKey) => ({
        path: `/${vrHeadsetKey}/`,
        element: <Home vrHeadsetKey={vrHeadsetKey} />,
    })),
];

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
