import { SimpleVideoPlayer } from "../components/SimpleVideoPlayer";
import { fbtSystemConfigsByKey, fbtSystemsByKey, type FBTSystemConfigKey, type FBTSystemKey } from "../fbt/FBT";
import { type VRSystem } from "../vr/VR";
import { type ItemList, type VRFBTSystem, ExampleVideoKeys } from "./VRFBTSystem";

const HTCViveUltimateSystemKey: FBTSystemKey = "htc_vive_ultimate_trackers";

export function makeHTCViveUltimate(vrSystem: VRSystem, fbtConfigKey: FBTSystemConfigKey): VRFBTSystem {
    const fbtSystemConfig = fbtSystemConfigsByKey[fbtConfigKey];
    if (fbtSystemConfig.fbtSystemKey !== "htc_vive_ultimate_trackers") {
        throw "Invalid FBT system config";
    }

    if (!vrSystem.prefersPCVR) {
        return {
            key: "none",
            name: fbtSystemsByKey[HTCViveUltimateSystemKey].name,
            imageURL: "htc_vive_ultimate_trackers/htc_vive_ultimate.jpg",
            recommendation: <p className="warning">VIVE Ultimate trackers require a PC.</p>,
            howItWorks: <p>N/A</p>,
            itemList: { required: [], optional: [] },
            availability: <p>N/A</p>,
            tracking: <p>N/A</p>,
            specs: <p>N/A</p>,
            examples: {},
            drawbacks: [],
        };
    }

    return {
        key: fbtSystemConfig.key,
        name: fbtSystemsByKey[HTCViveUltimateSystemKey].name,
        imageURL: "htc_vive_ultimate_trackers/htc_vive_ultimate.jpg",
        recommendation: <p className="recommended">HTC VIVE Ultimate Trackers are compatible with your headset.</p>,
        howItWorks: (
            <>
                <img src="htc_vive_ultimate_trackers/htc_vive_ultimate_cameras.jpg" />
                <p>
                    HTC VIVE Ultimate Trackers are an inside-out system. Each tracker has 2 cameras which use a SLAM
                    algorithm (Simultaneous Localization and Mapping) to keep track where it is in your playspace.
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
            switch (fbtSystemConfig.key) {
                case "htc_vive_ultimate-3_trackers":
                    c.required.push({
                        name: "VIVE Ultimate Tracker 3+1 Kit",
                        count: 1,
                        each_price_cents: 68900,
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
            switch (fbtSystemConfig.key) {
                case "htc_vive_ultimate-3_trackers":
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
                nodes[v] = <></>;
            }

            return nodes;
        })(),
        drawbacks: [
            {
                key: "occlusion",
                title: "Occlusion",
                content: (
                    <>
                        <img style={{ width: "480px", height: "320px" }} />
                        <div className="sub-header">Occlusion</div>
                        <p>
                            During play, your arms and clothing may block the cameras, or you may be oriented such that
                            there is very little information for the cameras (e.g. a white wall). This causes the
                            tracker to stop moving, or even fly off into the distance.
                        </p>
                        <p>There’s no way to work around this limitation.</p>
                    </>
                ),
            },
            {
                key: "playspace",
                title: "Changes to Playspace",
                content: (
                    <>
                        <img style={{ width: "480px", height: "320px" }} />
                        <div className="sub-header">Changes to Playspace</div>
                        <p>
                            The tracker needs to scan your playspace and compare the current camera snapshot to figure
                            out where it is. If you move things around and your playspace changes enough, the tracker
                            will get lost.
                        </p>
                        <p>
                            This may also happen if your playspace lighting is significantly different in the daytime vs
                            nighttime.
                        </p>
                        <p>To solve this, you have to rescan your playspace.</p>
                    </>
                ),
            },
        ],
        review: {
            cost: {
                score: 2,
                content: (
                    <p>
                        VIVE Ulimate is expensive, and you will also need to buy straps to mount the trackers to your
                        body
                    </p>
                ),
            },
            tracking: {
                score: 4,
                content: (
                    <>
                        <p>VIVE Ultimate trackers have perfect tracking, as long as they’re not occluded.</p>
                        <p>
                            If the tracker cameras lose tracking, parts of your body will freeze in place. This can
                            happen if you accidentally cover both cameras with your arm, if you turn towards an empty
                            area of your room, or get too close to a surface (like a wall or couch). It takes a few
                            seconds for the trackers to recover.
                        </p>
                    </>
                ),
            },
            calibration: {
                score: 4,
                content: (
                    <>
                        <SimpleVideoPlayer
                            src={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-vr_session_setup.mp4`}
                            thumbnail={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-vr_session_setup.jpg`}
                            width={480}
                            height={420}
                        />
                        <p>
                            You will have to do space-calibration to align your headset’s playspace to the trackers’
                            playspace.
                        </p>
                        <p>
                            As a one-time setup, you will need to scan your playspace. If you move things around
                            significantly, you may need to re-scan your playspace.
                        </p>
                    </>
                ),
            },
            overall: {
                score: 4,
                content: (
                    <>
                        <p>
                            I enjoy using VIVE Ultimate trackers because they are easy to set up and use. They’re great
                            when you just want to jump into VR for low energy activities like chatting with friends.
                        </p>
                        <p>
                            Although occlusion problems do happen, they happen less often than VIVE 3.0s and don't cause
                            your body to fly off into the distance. I find this acceptable.
                        </p>
                    </>
                ),
            },
        },
    };
}
