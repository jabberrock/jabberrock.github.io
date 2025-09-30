import { fbtSystemsByKey, type FBTSystemKey } from "../fbt/FBT";
import { vrHeadsetsByKey, type VRSystem } from "../vr/VR";
import { type ItemList, type VRFBTSystem, ExampleVideoKeys } from "./VRFBTSystem";

const HTCViveUltimateSystemKey: FBTSystemKey = "htc_vive_ultimate";

export function makeHTCViveUltimate(vrSystem: VRSystem, config: string): VRFBTSystem {
    if (!vrSystem.prefersPCVR) {
        return {
            key: HTCViveUltimateSystemKey,
            name: fbtSystemsByKey[HTCViveUltimateSystemKey].name,
            imageURL: "images/htc_vive_ultimate.jpg",
            recommendation: <p className="warning">HTC VIVE Ultimate trackers require a PC</p>,
            howItWorks: <p>N/A</p>,
            itemList: { required: [], optional: [] },
            availability: <p>N/A</p>,
            tracking: <p>N/A</p>,
            specs: <p>N/A</p>,
            examples: {},
        };
    }

    return {
        key: `${HTCViveUltimateSystemKey}-${config}`,
        name: fbtSystemsByKey[HTCViveUltimateSystemKey].name,
        imageURL: "images/htc_vive_ultimate.jpg",
        recommendation: (function () {
            if (vrHeadsetsByKey[vrSystem.headset].tracking !== "lighthouse" && config === "3_trackers") {
                return (
                    <div className="warning">
                        <p>HTC VIVE Ultimate and your headset have separate playspaces.</p>
                        <p>You will need to perform Space Calibration:</p>
                        <ul>
                            <li>At the start of each VR session</li>
                            <li>
                                Whenever your headset playspace shifts:
                                <ul>
                                    <li>You reset your orientation</li>
                                    <li>Your headset playspace drifts over time</li>
                                </ul>
                            </li>
                        </ul>
                        <p className="warning">We do not recommend HTC VIVE Ultimate trackers with your headset.</p>
                    </div>
                );
            } else {
                return (
                    <>
                        <p>HTC VIVE Ultimate trackers work with your headset.</p>
                    </>
                );
            }
        })(),
        howItWorks: (
            <>
                <img src="images/htc_vive_ultimate_cameras.jpg" />
                <p>
                    HTC VIVE Ultimate is an inside-out system. Each tracker has 2 cameras which use a SLAM algorithm
                    (Simultaneous Localization and Motion) to keep track where it is in your playspace.
                </p>
                <p>
                    With 3 trackers, only the position and rotation of the hip and ankles are known. The position of
                    other part of the body (e.g. chest, knees and feet) are estimated using IK (inverse kinematics).
                </p>
            </>
        ),
        itemList: (function () {
            const c: ItemList = {
                required: [],
                optional: [],
            };
            switch (config) {
                case "3_trackers":
                    c.required.push({
                        name: "VIVE Ultimate Tracker 3+1 Kit",
                        count: 1,
                        each_price_cents: 55999,
                        link: new URL("https://www.vive.com/us/accessory/vive-ultimate-tracker/"),
                    });
                    break;
            }
            c.required.push({
                name: "TrackStraps",
                comment: "to attach trackers to body",
                count: 1,
                each_price_cents: 4999,
                link: new URL(
                    "https://www.vive.com/us/accessory/trackstraps-for-vive-ultimate-tracker-plus-dance-dash/",
                ),
            });
            return c;
        })(),
        availability: (
            <>
                <p>
                    HTC VIVE
                    <br />
                    <a href="https://vive.com/" target="_blank">
                        vive.com
                    </a>
                </p>
                <p>Available immediately</p>
            </>
        ),
        tracking: (function () {
            switch (config) {
                case "3_trackers":
                    return (
                        <>
                            <div>3 point tracking (Chest, 2x Ankle)</div>
                            <div>Knees and feet are estimated with inverse kinematics (IK).</div>
                        </>
                    );
            }
        })(),
        specs: (
            <>
                <div>Up to 7.5 hours</div>
                <div>96 g / 3.4 oz per tracker</div>
                <div>123 cm³ (77 x 58.6 x 27.3 mm)</div>
            </>
        ),
        examples: (function () {
            const nodes: Record<string, React.ReactNode> = {};
            for (const v of ExampleVideoKeys) {
                nodes[v] = (
                    <></>
                );
            }

            return nodes;
        })(),
        drawbacks: (
            <>
                <div className="drawback">
                    <div className="sub-heading">Occlusion</div>
                    <img style={{ width: "480px", height: "320px" }} />
                    <p>
                        During play, your arms and clothing may block the cameras, or you may be oriented such that
                        there is very little information for the cameras (e.g. a white wall). This causes the tracker to
                        stop moving, or even fly off into the distance.
                    </p>
                    <p>There’s no way to work around this limitation.</p>
                </div>
                <div className="drawback">
                    <div className="sub-heading">Changes to Playspace</div>
                    <img style={{ width: "480px", height: "320px" }} />
                    <p>
                        The tracker needs to scan your playspace and compare the current camera snapshot to figure out
                        where it is. If you move things around and your playspace changes enough, the tracker will get
                        lost.
                    </p>
                    <p>
                        This may also happen if your playspace lighting is significantly different in the daytime vs
                        nighttime.
                    </p>
                    <p>To solve this, you have to rescan your playspace.</p>
                </div>
                <div className="drawback">
                    <div className="sub-heading">Estimated Leg Position</div>
                    <img style={{ width: "480px", height: "320px" }} />
                    <p>
                        Knees are estimated using IK (inverse kinematics), so the estimated position can be very
                        different from the actual position.
                    </p>
                </div>
                <div className="drawback">
                    <div className="sub-heading">Jitter</div>
                    <img style={{ width: "480px", height: "320px" }} />
                    <p>Because IK is not perfect, certain movements can result in a lot of jitter.</p>
                </div>
            </>
        ),
    };
}
