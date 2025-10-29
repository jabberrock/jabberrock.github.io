import { SimpleVideoPlayer } from "../components/SimpleVideoPlayer";
import { VideoPlayer } from "../components/VideoPlayer";
import { fbtSystemConfigsByKey, fbtSystemsByKey, type FBTSystemConfigKey, type FBTSystemKey } from "../fbt/FBT";
import { vrHeadsetsByKey, type VRHeadsetKey, type VRSystem } from "../vr/VR";
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
                case "htc_vive_ultimate_trackers-3_trackers":
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
                case "htc_vive_ultimate_trackers-3_trackers":
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
            let vrHeadset: VRHeadsetKey;
            if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                vrHeadset = "htc_vive";
            } else {
                vrHeadset = "meta_quest_3";
            }

            const nodes: Record<string, React.ReactNode> = {};
            for (const v of ExampleVideoKeys) {
                nodes[v] = (
                    <>
                        <VideoPlayer
                            key={v}
                            video_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-${v}.mp4`}
                            thumbnail_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-${v}.jpg`}
                            width={480}
                            height={640}
                        />
                        {vrHeadset !== vrSystem.headset && (
                            <div>
                                (Captured with {vrHeadsetsByKey[vrHeadset].name} instead of{" "}
                                {vrHeadsetsByKey[vrSystem.headset].name})
                            </div>
                        )}
                    </>
                );
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
                content: <p>You will need to buy the trackers and straps.</p>,
            },
            setup: {
                score: 4,
                content: (
                    <p>
                        Install VIVE hub, and follow the setup process. You'll pair the trackers, and scan the
                        playspace.
                    </p>
                ),
                drawbacks: [
                    {
                        key: "rescan_playspace",
                        title: "Re-scan Playspace",
                        content: (
                            <p>
                                If your playspace changes significantly, the trackers may be unable to tracker properly.
                                You will need to re-scan your playspace.
                            </p>
                        ),
                        collapsed: true,
                    },
                ],
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
                    </>
                ),
            },
            gameplay: {
                score: 1,
                content: (
                    <>
                        <p>
                            When the trackers are tracking, movement is accurate and there is no noticeable lag.
                            Trackers handle fast and extreme movements with no problems.
                        </p>
                        <p>The trackers are mostly fine when you're standing or walking.</p>
                        <p>
                            However, when I try to sit down or lie down, the trackers will almost always lose tracking.
                            Sometimes, the trackers will recover after a few seconds. Often, the trackers won't recover
                            until I stand up. And rarely, the trackers won't recover even when I stand up! I have to
                            move to my computer and face the monitor for the trackers to recover.
                        </p>
                        <p>
                            When I'm with a group of friends, it is very noticeable that I'm wearing VIVE Ultimates, in
                            a bad way.
                        </p>
                        <p>
                            (While recording this demo, I had to repeat actions over and over again until I got a
                            recording without losing tracking.)
                        </p>
                    </>
                ),
                drawbacks: [
                    {
                        key: "losing_tracking",
                        title: "Losing Tracking",
                        content: (
                            <>
                                <p>
                                    When the tracker loses tracking, parts of your body will freeze in place. This
                                    happens a lot, and there's nothing you can do to prevent it.
                                </p>
                                <video
                                    src="htc_vive_ultimate_trackers/limitations/fail_getting_up_stuck-sxs.mp4"
                                    autoPlay
                                    controls
                                    loop
                                />
                                <p>When I tried to stand up.</p>
                                <video
                                    src="htc_vive_ultimate_trackers/limitations/fail_sitting_on_floor-sxs.mp4"
                                    autoPlay
                                    controls
                                    loop
                                />
                                <p>When I tried to sit on the floor.</p>
                                <video
                                    src="htc_vive_ultimate_trackers/limitations/fail_picking_up_item-sxs.mp4"
                                    autoPlay
                                    controls
                                    loop
                                />
                                <p>When I bent over to pick up an item.</p>
                                <p>It usually takes a few seconds for the trackers to recover.</p>
                                <video
                                    src="htc_vive_ultimate_trackers/limitations/fail_recovery_until_point_at_monitor-sxs.mp4"
                                    autoPlay
                                    controls
                                    loop
                                />
                                <p>
                                    However, sometimes the trackers are unable to recover, and you will need to take it
                                    off and point it towards your computer to restore tracking. This breaks immersion
                                    pretty badly.
                                </p>
                            </>
                        ),
                    },
                ],
            },
            comfort: {
                score: 2,
                content: (
                    <>
                        <p>The trackers are not comfortable for me.</p>
                        <p>
                            HTC, the manufacturer, recommends mounting the ankle trackers on the front of your shins.
                            This is very uncomfortable for me because my shins are thin. I also need to over-tighten the
                            straps so that the trackers don't shift to the side during gameplay.
                        </p>
                        <p>
                            Instead, I prefer to wear the ankle trackers on my feet, over socks. They are quite
                            comfortable in this position. However, they lose tracking more often since they're pointing
                            towards the ceiling.
                        </p>
                    </>
                ),
            },
            overall: {
                score: 1,
                content: (
                    <>
                        <p>I do not enjoy using VIVE Ultimate trackers.</p>
                        <p>The trackers constantly lose tracking. There's no VR immersion with these trackers.</p>
                    </>
                ),
            },
        },
    };
}
