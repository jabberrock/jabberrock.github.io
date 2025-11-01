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
    {
        path: "/about",
        element: <About />,
    },
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
                <button className="scroll-top" onClick={() => scrollTo(0, 0)}>
                    &#x25B2;
                </button>
            </div>
        </SelectedFBTs>
    );
}

function About() {
    return (
        <div className="main">
            <div className="sidebar">
                <nav>
                    <a href="/">&lt; Back to comparison</a>
                </nav>
            </div>
            <div className="content p-4" style={{ maxWidth: "800px" }}>
                <p>
                    <img src="/about/jabberrock.jpg" style={{ width: "100%" }} />
                </p>
                <h1>Hi!</h1>
                <p>I'm Jabberrock, and I have been using Full Body Tracking (FBT) for the last three years!</p>
                <h2>SlimeVR</h2>
                <p>
                    I started by building my own DIY Slime trackers, and then for friends. I contributed to the SlimeVR
                    firmware and server, eventually releasing "Stay Aligned", which reduces drift for Slime trackers
                    using obsolete IMUs. I also helped at the SlimeVR booth at Open Sauce 2025.
                </p>
                <p>
                    During this time, I have heard a lot of comparisons between SlimeVR and VIVE trackers. There is a
                    lot of misinformation and out-of-date "facts" floating around.
                </p>
                <h2>Comparison</h2>
                <p>
                    I built this comparison website for *me* to understand all the systems. I needed to be confident
                    about my recommendations, when friends asked about FBT. I wanted to have recordings that could
                    support or reject things that they heard.
                </p>
                <p>
                    I tried my best to be impartial, and to provide the raw recordings to support my opinions.
                    Hopefully, it will help you decide on which FBT system is right for you!
                </p>
                My recommendation is:
                <ol>
                    <li>If you have a Quest headset, choose SlimeVR.</li>
                    <li>If you have a Lighthouse-based VR headset, choose SlimeVR or VIVE Tracker 3.0.</li>
                    <li>Never choose VIVE Ultimate trackers.</li>
                </ol>
                <br />
                <br />
                <p>I use Amazon affiliate links to support this site.</p>
            </div>
        </div>
    );
}
