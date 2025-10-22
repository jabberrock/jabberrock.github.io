import { Carousel } from "react-bootstrap";
import { SideBySideVideoPlayer } from "../components/SideBySideVideoPlayer";
import { SimpleImage } from "../components/SimpleImage";
import { SimpleVideoPlayer } from "../components/SimpleVideoPlayer";
import { VideoPlayer } from "../components/VideoPlayer";
import { fbtSystemsByKey, type FBTSystemKey } from "../fbt/FBT";
import { vrHeadsetsByKey, type VRHeadsetKey, type VRSystem } from "../vr/VR";
import { ExampleVideoKeys, type ItemList, type VRFBTSystem } from "./VRFBTSystem";

const HTCVive30SystemKey: FBTSystemKey = "htc_vive_trackers_3_0";

export function makeHTCVive30(vrSystem: VRSystem, fbtConfig: string): VRFBTSystem {
    if (!vrSystem.prefersPCVR) {
        return {
            key: `${HTCVive30SystemKey}-${fbtConfig}`,
            name: fbtSystemsByKey[HTCVive30SystemKey].name,
            imageURL: "htc_vive_trackers_3_0/htc_vive_3_0.jpg",
            recommendation: <p className="warning">HTC VIVE Trackers 3.0 require a PC</p>,
            howItWorks: <p>N/A</p>,
            itemList: { required: [], optional: [] },
            availability: <p>N/A</p>,
            tracking: <p>N/A</p>,
            specs: <p>N/A</p>,
            examples: {},
        };
    }

    if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse" && fbtConfig === "3_trackers_1_continuous") {
        return {
            key: `${HTCVive30SystemKey}-${fbtConfig}`,
            name: fbtSystemsByKey[HTCVive30SystemKey].name,
            imageURL: "htc_vive_trackers_3_0/htc_vive_3_0.jpg",
            recommendation: (
                <p className="warning">Your headset is Lighthouse-based and does not require continuous calibration with HTC VIVE Trackers 3.0.</p>
            ),
            howItWorks: <p>N/A</p>,
            itemList: { required: [], optional: [] },
            availability: <p>N/A</p>,
            tracking: <p>N/A</p>,
            specs: <p>N/A</p>,
            examples: {},
        };
    }

    return {
        key: `${HTCVive30SystemKey}-${fbtConfig}`,
        name: fbtSystemsByKey[HTCVive30SystemKey].name,
        imageURL: "htc_vive_trackers_3_0/htc_vive_3_0.jpg",
        recommendation: (function () {
            if (fbtConfig === "3_trackers") {
                if (vrHeadsetsByKey[vrSystem.headset].tracking !== "lighthouse") {
                    return (
                        <div>
                            <p className="warning">HTC VIVE Trackers 3.0 without continuous calibration is not recommended for your headset.</p>
                            <p>
                                HTC VIVE Trackers 3.0 and your headset have separate playspaces. You will need to
                                perform space calibration whenever you reset your orientation, or your headset loses
                                tracking.
                            </p>
                            <p>
                                If you choose HTC VIVE Trackers 3.0, we recommend using continuous calibration with an
                                extra tracker instead.
                            </p>
                        </div>
                    );
                } else {
                    return (
                        <p className="recommended">HTC VIVE Trackers 3.0 are compatible with your headset.</p>
                    );
                }
            } else if (fbtConfig === "3_trackers_1_continuous") {
                if (vrHeadsetsByKey[vrSystem.headset].tracking !== "lighthouse") {
                    return (
                            <p className="recommended">HTC VIVE Trackers 3.0 with continuous calibration is compatible with your headset.</p>
                    );
                }
            }
        })(),
        howItWorks: (
            <>
                <img src="htc_vive_trackers_3_0/lighthouse_based_systems.jpg" />
                <p>
                    HTC VIVE 3.0 is a Lighthouse-based system. The base stations send out pulses of infrared light, which allows a tracker to figure out
                    its position and the rotation.
                </p>
                <p>
                    With 3 trackers, only the position and rotation of the hip and feet are known. The position of other
                    part of the body (e.g. chest, knees and ankles) are estimated using IK (inverse kinematics).
                </p>
            </>
        ),
        itemList: (function () {
            const c: ItemList = {
                required: [],
                optional: [],
            };
            switch (fbtConfig) {
                case "3_trackers":
                    c.required.push({
                        name: "VIVE 3.0 Tracker",
                        count: 3,
                        each_price_cents: 14900,
                        link: new URL("https://www.vive.com/us/accessory/tracker3/"),
                    });
                    break;
                case "3_trackers_1_continuous":
                    c.required.push({
                        name: "VIVE 3.0 Tracker",
                        comment: "for tracking",
                        count: 3,
                        each_price_cents: 14900,
                        link: new URL("https://www.vive.com/us/accessory/tracker3/"),
                    });
                    c.required.push({
                        name: "VIVE 3.0 Tracker",
                        comment: "for continuous calibration",
                        count: 1,
                        each_price_cents: 14900,
                        link: new URL("https://www.vive.com/us/accessory/tracker3/"),
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
            c.required.push({
                name: "HTC VIVE SteamVR Base Station 1.0",
                count: 2,
                each_price_cents: vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse" ? 0 : 13499,
                link: new URL("https://www.amazon.com/HTC-Vive-Base-Station-pc/dp/B01M01B92P"),
            });
            c.optional.push({
                name: "Skywin VR Tripod Stand",
                comment: "to position base stations",
                count: 1,
                each_price_cents: 4699,
                link: new URL(
                    "https://www.amazon.com/Skywin-Compatible-Station-Sensors-Constellation-PC/dp/B07B6FDKZ8",
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
            switch (fbtConfig) {
                case "3_trackers":
                    return (
                        <>
                            <div>3 point tracking (Chest, 2x Feet)</div>
                            <div>Knees and ankles estimated with inverse kinematics (IK).</div>
                        </>
                    );
                case "3_trackers_1_continuous":
                    return (
                        <>
                            <div>3 point tracking (Chest, 2x Feet)</div>
                            <div>Knees and ankles are estimated with inverse kinematics (IK).</div>
                            <div>
                                Extra tracker is used for continuous calibration and does not provide extra tracking.
                            </div>
                        </>
                    );
            }
        })(),
        specs: (
            <>
                <div>Up to 7.5 hours</div>
                <div>75 g / 2.6 oz per tracker</div>
                <div>247 cm³ (70.9 × 79.0 × 44.1 mm)</div>
                <img src="htc_vive_trackers_3_0/htc_vive_3_0_size.jpg" />
            </>
        ),
        introExample: (function () {
            let vrHeadset: VRHeadsetKey;
            if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                vrHeadset = "htc_vive";
            } else {
                vrHeadset = "meta_quest_3";
            }
            
            return (
                <SideBySideVideoPlayer
                    video_url={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-dancing.mp4`}
                    thumbnail_url={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-dancing.jpg`}
                    width={480}
                    height={320}
                />
            );
        })(),
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
                            video_url={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-${v}.mp4`}
                            thumbnail_url={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-${v}.jpg`}
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
        drawbacks: (
            <>
                {vrHeadsetsByKey[vrSystem.headset].tracking !== "lighthouse" && fbtConfig !== "3_trackers_1_continuous" && (
                    <div className="drawback">
                        <img style={{ width: "480px", height: "320px" }} />
                        <div className="sub-header">Space Calibration</div>
                        <p>HTC VIVE Trackers 3.0 and your headset have separate playspaces.</p>
                        <p>
                            You will need to perform Space Calibration to match the two playspaces. This is done at the
                            start of each VR session and whenever your headset playspace shifts (which happens a lot).
                        </p>
                        <p>
                            If you choose HTC VIVE Trackers 3.0, we recommend using continuous calibration with an extra
                            tracker to avoid manual Space Calibration.
                        </p>
                    </div>
                )}
                <div className="drawback">
                    <img style={{ width: "480px", height: "320px" }} />
                    <div className="sub-header">Occlusion</div>
                    <p>
                        During play, your arms and clothing may hide the tracker from the base stations. This occlusion
                        causes the tracker to stop moving, or even fly off into the distance.
                    </p>
                    <p>
                        This can be minimized by careful position of the base stations, wearing tight clothing, and
                        being careful of where you move your arms.
                    </p>
                </div>
                <div className="drawback">
                    <Carousel>
                        {Array.from({ length: 5 }, (_, i) => (
                            <Carousel.Item key={i}>
                                <SimpleImage src={`${HTCVive30SystemKey}/limitations/htc_vive_trackers_3_0-reflections-${i + 1}.jpg`} width={480} height={320} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="sub-header">Reflective Surfaces</div>
                    <p>
                        The base stations use infrared light, which can bounce off reflective surfaces. This confuses
                        the tracker and causes it to fly off into the distance.
                    </p>
                    <p>
                        To solve this, close your window blinds, cover your mirrors with a cloth, and cover any other
                        reflective surfaces.
                    </p>
                </div>
                <div className="drawback">
                    <SimpleImage src={`${HTCVive30SystemKey}/limitations/htc_vive_trackers_3_0-wifi_interference.jpg`} width={480} height={320} />
                    <div className="sub-header">Wi-Fi Interference</div>
                    <p>
                        Your 2.4Ghz router can overpower the dongles if it is placed too close. To solve this, move your dongles away from the router.
                    </p>
                </div>
                <div className="drawback">
                    <SimpleImage src={`${HTCVive30SystemKey}/estimated_legs.jpg`} width={480} height={640} />
                    <div className="sub-header">Estimated Leg Position</div>
                    <p>Knees are estimated using inverse kinematics (IK), so the legs may not exactly match.</p>
                    <p>
                        In this example, the knee is much lower than the actual knee. If you move your knees without
                        moving your feet, your avatar's legs won't move.
                    </p>
                </div>
                <div className="drawback">
                    <img style={{ width: "480px", height: "320px" }} />
                    <div className="sub-header">Jitter</div>
                    <p>Because IK is not perfect, certain movements can result in a lot of jitter.</p>
                </div>
                <div className="drawback">
                    <img style={{ width: "480px", height: "320px" }} />
                    <div className="sub-header">Limited playspace</div>
                    <p>
                        The playspace is limited by where the base stations are placed. Base Station 1.0 have a maximum
                        playspace of 5m x 5m (15ft x 15ft), while Base Station 2.0 ($220 each) have a maximum playspace
                        of 10m x 10m (30ft x 30ft).
                    </p>
                </div>
            </>
        ),
        vrSession: {
            setup: (function() {
                if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                    return (
                        <p>Turn on your trackers and put them on.</p>
                    );
                } else {
                    let vrHeadset: VRHeadsetKey;
                    if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                        vrHeadset = "htc_vive";
                    } else {
                        vrHeadset = "meta_quest_3";
                    }

                    return (
                        <>
                            <SimpleVideoPlayer
                                src={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-vr_session_setup.mp4`}
                                thumbnail={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-vr_session_setup.jpg`}
                                width={480}
                                height={420}
                            />
                        <ol>
                            <li>Turn on one tracker</li>
                            <li>Start OVR Space Calibrator, tightly hold the tracker and your controller</li>
                            <li>
                                Start the space calibration process, and wave your tracker and controller in a figure of
                                8
                            </li>
                            <li>Your tracker should show up in the right position</li>
                            <li>Turn on the rest of your trackers</li>
                            <li>Start VRChat</li>
                            <li>T-pose, and click the "FBT Calibration" button</li>
                        </ol>
                        </>
                    );
                }
            })(),
            play:
                vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse" ||
                fbtConfig === "3_trackers_1_continuous" ? (
                    <>
                        <p>It just works.</p>
                    </>
                ) : (
                    <>
                        <p>Play normally.</p>
                        <p>
                            Over time, your in-game trackers may drift away from their real positions. This is because
                            your headset's playspace drifts away from the tracker's playspace.
                        </p>
                        <p>
                            Your headset's playspace might also suddenly change, and cause the trackers to fly away.
                            This happens if your manually reset your orientation, or if your headset loses tracking
                            (e.g. when you take the headset off and put it back on).
                        </p>
                        <p>You will need to re-do the space calibration process.</p>
                    </>
                ),
        },
        review: {
            cost: (function() {
                if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                    return {
                        score: 4,
                        content: (
                            <p>VIVE Tracker 3.0 are expensive, and you will also need to buy straps to mount the trackers to your body. Luckily, you don't need to buy extra Lighthouse base stations.</p>
                        )
                    };
                } else if (fbtConfig === "3_trackers_1_continuous") {
                    return {
                        score: 1,
                        content: (
                            <p>VIVE Tracker 3.0 are expensive, and you will also need to buy straps to mount the trackers to your body, and Lighthouse base stations.</p>
                        )
                    };
                } else {
                    return {
                        score: 2,
                        content: (
                            <p>VIVE Tracker 3.0 are expensive, and you will also need to buy straps to mount the trackers to your body, and Lighthouse base stations.</p>
                        )
                    };
                }
            })(),
            tracking: {
                score: 3,
                content: (
                    <>
                        <p>VIVE Tracker 3.0 has perfect tracking, as long as they’re visible to the base stations.</p>
                        <p>If the trackers lose sight of the base stations, parts of your body will freeze in place, or even fly off into the distance. This can easily happen if you move your arm in front of your chest tracker, or if you just bend down a bit. It takes a few seconds for the trackers to recover.</p>
                        <p>If you have reflective surfaces (e.g. uncovered windows or mirrors), standing lamps, or a 2.4Ghz router that is placed too closed to the tracker dongles, your body will often randomly fly off into the distance.</p>
                        <p>This annoys me a lot because it completely breaks the immersion for me, and anyone I’m chatting with.</p>
                    </>
                )
            },
            calibration: (function() {
                if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                    const vrHeadset = "htc_vive";
                    return {
                        score: 5,
                        content: (
                            <>
                                <SimpleVideoPlayer
                                    src={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-vr_session_setup.mp4`}
                                    thumbnail={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-vr_session_setup.jpg`}
                                    width={480}
                                    height={420}
                                />
                                <p>Just put your headset and tracker on, and start playing!</p>
                            </>
                        )
                    };
                } else if (fbtConfig === "3_trackers_1_continuous") {
                    const vrHeadset = "meta_quest_3";
                    return {
                        score: 4,
                        content: (
                            <>
                                <SimpleVideoPlayer
                                    src={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-vr_session_setup.mp4`}
                                    thumbnail={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-vr_session_setup.jpg`}
                                    width={480}
                                    height={420}
                                />
                                <p>Just put your headset and tracker on, enable continuous calibration, and start playing!</p>
                                <p>During play, your headset may randomly reset its playspace. Your avatar will fly off to a random position. But continuous calibration will re-align the two spaces after a few seconds.</p>
                            </>
                        )
                    };
                } else {
                    const vrHeadset = "meta_quest_3";
                    return {
                        score: 3,
                        content: (
                            <>
                                <SimpleVideoPlayer
                                    src={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-vr_session_setup.mp4`}
                                    thumbnail={`${HTCVive30SystemKey}/${fbtConfig}/${vrHeadset}/${HTCVive30SystemKey}-${fbtConfig}-${vrHeadset}-vr_session_setup.jpg`}
                                    width={480}
                                    height={420}
                                />
                                <p>Since your headset is not Lighthouse-based, you will have to do space-calibration to align your headset’s playspace to the trackers’ playspace.</p>
                                <p>During play, your headset may randomly reset its playspace. Your avatar will fly off to a random position. You will need to re-do space-calibration.</p>
                            </>
                        )
                    };
                }
            })(),
            overall: (function() {
                if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                    return {
                        score: 4,
                        content: (
                            <>
                                <p>I enjoy using VIVE Tracker 3.0s because they are so easy to set up and use. They’re great when you just want to jump into VR for low energy activities like chatting with friends.</p>
                                <p>However, I just cannot get used to the occlusion problems. I hate the freezing and flying off so much that I have to actively prevent it from happening. I move my arms in specific ways to prevent covering the hip tracker, and also try to keep facing at least one base station. This breaks the immersion for me.</p>
                            </>
                        )
                    };
                } else if (fbtConfig === "3_trackers_1_continuous") {
                    return {
                        score: 3,
                        content: (
                            <>
                                <p>I enjoy using VIVE Tracker 3.0s because they are so easy to set up and use. They’re great when you just want to jump into VR for low energy activities like chatting with friends.</p>
                                <p>However, I just cannot get used to the occlusion problems. I hate the freezing and flying off so much that I have to actively prevent it from happening. I move my arms in specific ways to prevent covering the hip tracker, and also try to keep facing at least one base station. This breaks the immersion for me.</p>
                                <p>When my headset randomly resets its playspace, my avatar flies off into the distance. That’s another huge immersion breaker for me.</p>
                            </>
                        )
                    }
                } else {
                    return {
                        score: 2,
                        content: (
                            <>
                                <p>I enjoy using VIVE Tracker 3.0s because they are so easy to set up and use. They’re great when you just want to jump into VR for low energy activities like chatting with friends.</p>
                                <p>However, I just cannot get used to the occlusion problems. I hate the freezing and flying off so much that I have to actively prevent it from happening. I move my arms in specific ways to prevent covering the hip tracker, and also try to keep facing at least one base station. This breaks the immersion for me.</p>
                                <p>When my headset randomly resets its playspace, my avatar flies off into the distance. I have to pause everything and do space-calibration. That’s another huge immersion breaker for me.</p>
                            </>
                        )
                    }
                }
            })()
        }
    };
}
