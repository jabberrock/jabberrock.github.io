import { CollapsibleSection } from "../components/CollapsibleSection";
import { VideoInView } from "../components/VideoInView";
import { fbtSystemConfigsByKey, fbtSystemsByKey, type FBTSystemConfigKey, type FBTSystemKey } from "../fbt/FBT";
import { vrHeadsetsByKey, type VRHeadsetKey } from "../vr/VR";
import { type ItemList, type VRFBTSystem } from "./VRFBTSystem";

const HTCViveUltimateSystemKey: FBTSystemKey = "htc_vive_ultimate_trackers";

export function makeHTCViveUltimate(vrHeadsetKey: VRHeadsetKey, fbtConfigKey: FBTSystemConfigKey): VRFBTSystem {
    const fbtSystemConfig = fbtSystemConfigsByKey[fbtConfigKey];
    if (fbtSystemConfig.fbtSystemKey !== "htc_vive_ultimate_trackers") {
        throw "Invalid FBT system config";
    }

    return {
        key: fbtSystemConfig.key,
        name: fbtSystemsByKey[HTCViveUltimateSystemKey].name,
        recommendation: (function () {
            const vrHeadset = vrHeadsetsByKey[vrHeadsetKey];
            if (vrHeadset.tracking === "lighthouse") {
                return (
                    <p className="warning">
                        VIVE Ultimate trackers are compatible with your headset, but you probably should consider VIVE
                        Tracker 3.0 instead since your headset is Lighthouse-based.
                    </p>
                );
            } else {
                if (vrHeadset.requiresPC) {
                    return <p className="recommended">VIVE Ultimate trackers are compatible with your headset.</p>;
                } else {
                    return (
                        <p>
                            <span className="recommended">
                                VIVE Ultimate trackers are compatible with your headset in PCVR mode.
                            </span>{" "}
                            <span className="warning">It cannot be used in standalone mode.</span>
                        </p>
                    );
                }
            }
        })(),
        videoWarning: vrHeadsetKey !== "meta_quest" && (
            <p>
                Videos were recorded with a Meta Quest 3. There should be no difference using your headset because VIVE
                Ultimate trackers work the same way with all headsets.
            </p>
        ),
        howItWorks: (
            <>
                <p>
                    <img src="/htc_vive_ultimate_trackers/htc_vive_ultimate_cameras.jpg" />
                </p>
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
                updated: new Date("2025-11-01"),
            };
            switch (fbtSystemConfig.key) {
                case "htc_vive_ultimate_trackers-3_trackers":
                    c.required.push({
                        name: "VIVE Ultimate Tracker 3+1 Kit",
                        count: 1,
                        each_price_cents: 68900,
                        link: new URL("https://amzn.to/4qCqzvz"),
                    });
                    break;
            }
            c.required.push({
                name: "TrackStraps",
                comment: "to attach trackers to body",
                count: 1,
                each_price_cents: 4999,
                link: new URL("https://amzn.to/4qCUOTh"),
            });
            return c;
        })(),
        availability: (
            <CollapsibleSection title="HTC VIVE" className="availability">
                <p>
                    <a href="https://vive.com/" target="_blank">
                        vive.com
                    </a>
                </p>
                <p>Available immediately</p>
            </CollapsibleSection>
        ),
        introExample: (
            <VideoInView
                src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-dancing-sxs.mp4`}
                className="sxs"
            />
        ),
        examples: {
            standing: (
                <VideoInView
                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-standing-overlay.mp4`}
                    className="overlay"
                />
            ),
            sitting: (
                <>
                    <VideoInView
                        src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-sitting-overlay.mp4`}
                        className="overlay"
                    />
                    <p>
                        I was unable to record this video facing forward. Whenever I sat down, my waist tracker would
                        lose tracking and freeze. I captured this only after a few attempts. As I was getting up, you
                        can see that my waist tracker was frozen.
                    </p>
                </>
            ),
            sittingOnFloor: (
                <>
                    <VideoInView
                        src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-sitting_on_floor-overlay.mp4`}
                        className="overlay"
                    />
                    <p>
                        This took many attempts because the waist tracker would keep losing tracking. I was looking down
                        in SteamVR mode to see if the tracker loses tracking, and then slowly lowering myself into
                        position.
                    </p>
                </>
            ),
            lyingDown: (
                <VideoInView
                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-lying_down-overlay.mp4`}
                    className="overlay"
                />
            ),
            dancing: (
                <VideoInView
                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-dancing-overlay.mp4`}
                    className="overlay"
                />
            ),
            exercise: (
                <VideoInView
                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-exercise-overlay.mp4`}
                    className="overlay"
                />
            ),
        },
        review: {
            cost: {
                score: 2,
                content: (
                    <>
                        <p>
                            <img src={`/${fbtSystemConfig.fbtSystemKey}/htc_vive_ultimate.jpg`} />
                        </p>
                        <p>You will need to buy the trackers and straps.</p>
                    </>
                ),
            },
            setup: {
                score: 4,
                content: (
                    <>
                        <p>
                            <img src="/htc_vive_ultimate_trackers/vive_hub.png" />
                        </p>
                        <p>
                            Install VIVE Hub, and follow the setup process. You'll pair the trackers, and scan the
                            playspace.
                        </p>
                    </>
                ),
                drawbacks: [
                    {
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
                        <VideoInView
                            src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/calibration.mp4`}
                            className="calibration"
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
                        <VideoInView
                            src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-exercise-sxs.mp4`}
                            className="sxs"
                        />
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
                            When I'm with a group of friends, it is very noticeable that I'm using VIVE Ultimate
                            trackers, in a bad way.
                        </p>
                    </>
                ),
                drawbacks: [
                    {
                        title: "Losing Tracking",
                        content: (
                            <>
                                <p>
                                    When the tracker loses tracking, parts of your body will freeze in place. This
                                    happens a lot, and there's nothing you can do to prevent it.
                                </p>
                                <VideoInView
                                    src="/htc_vive_ultimate_trackers/3_trackers/meta_quest_3/fail-sitting_down-4-sxs.mp4"
                                    className="sxs"
                                />
                                <p>When I sit down.</p>
                                <VideoInView
                                    src="/htc_vive_ultimate_trackers/3_trackers/meta_quest_3/fail-sitting_on_floor-1-sxs.mp4"
                                    className="sxs"
                                />
                                <p>When I sit on the floor.</p>
                                <VideoInView
                                    src="/htc_vive_ultimate_trackers/3_trackers/meta_quest_3/fail-bending_over-sxs.mp4"
                                    className="sxs"
                                />
                                <p>When I bend over to pick up an item.</p>
                                <VideoInView
                                    src="/htc_vive_ultimate_trackers/3_trackers/meta_quest_3/fail-rolling_onto_couch-sxs.mp4"
                                    className="sxs"
                                />
                                <p>When I roll onto my couch.</p>
                                <VideoInView
                                    src="/htc_vive_ultimate_trackers/3_trackers/meta_quest_3/fail-foot_stuck-sxs.mp4"
                                    className="sxs"
                                />
                                <p>Sometimes for no reason at all.</p>
                                <p>It usually takes a few seconds for the trackers to recover.</p>
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
                        <p>
                            <img
                                src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/wearing.jpg`}
                            />
                        </p>
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
                        <p>
                            The trackers constantly lose tracking, even with basic actions like sitting down. I don't
                            feel like I'm babysitting FBT.
                        </p>
                    </>
                ),
            },
        },
    };
}
