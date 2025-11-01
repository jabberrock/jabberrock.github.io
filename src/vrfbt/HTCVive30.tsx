import { Carousel } from "react-bootstrap";
import { fbtSystemConfigsByKey, fbtSystemsByKey, type FBTSystemConfigKey } from "../fbt/FBT";
import { vrHeadsetsByKey, type VRHeadsetKey } from "../vr/VR";
import { matchConfigOptional, nonNullArray, type ItemList, type VRFBTSystem } from "./VRFBTSystem";
import { VideoInView } from "../components/VideoInView";
import { CollapsibleSection } from "../components/CollapsibleSection";

export function makeHTCVive30(vrHeadsetKey: VRHeadsetKey, fbtConfigKey: FBTSystemConfigKey): VRFBTSystem {
    const fbtSystemConfig = fbtSystemConfigsByKey[fbtConfigKey];
    if (fbtSystemConfig.fbtSystemKey !== "htc_vive_trackers_3_0") {
        throw "Invalid FBT system config";
    }

    return {
        key: fbtSystemConfig.key,
        name: fbtSystemsByKey[fbtSystemConfig.fbtSystemKey].name,
        recommendation: (function () {
            const vrHeadset = vrHeadsetsByKey[vrHeadsetKey];
            if (
                vrHeadset.tracking === "lighthouse" &&
                fbtSystemConfig.key === "htc_vive_trackers_3_0-3_trackers_1_continuous"
            ) {
                return (
                    <p className="warning">
                        Your headset is Lighthouse-based and does not require continuous calibration.
                    </p>
                );
            } else {
                if (vrHeadset.requiresPC) {
                    return <p className="recommended">VIVE Tracker 3.0 is compatible with your headset.</p>;
                } else {
                    return (
                        <p className="warning">
                            VIVE Tracker 3.0 is compatible with your headset in PCVR mode. It cannot be used in
                            standalone mode.
                        </p>
                    );
                }
            }
        })(),
        videoWarning: (function () {
            if (vrHeadsetsByKey[vrHeadsetKey].tracking === "lighthouse") {
                if (vrHeadsetKey !== "htc_vive") {
                    return (
                        <p>
                            Videos were recorded with a HTC VIVE, which is a Lighthouse-based headset. There should be
                            no difference using your headset.
                        </p>
                    );
                }
            } else {
                if (vrHeadsetKey !== "meta_quest") {
                    return (
                        <p>
                            Videos were recorded with a Meta Quest 3, which is not a Lighthouse-based headset. There
                            should be no difference using your headset.
                        </p>
                    );
                }
            }
        })(),
        howItWorks: (
            <>
                <img src="/htc_vive_trackers_3_0/lighthouse_based_systems.jpg" />
                <p>
                    HTC VIVE 3.0 is a Lighthouse-based system. The base stations send out pulses of infrared light,
                    which allows a tracker to figure out its position and the rotation.
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
                updated: new Date("2025-10-01"),
            };
            switch (fbtSystemConfig.key) {
                case "htc_vive_trackers_3_0-3_trackers":
                    c.required.push({
                        name: "VIVE 3.0 Tracker",
                        count: 3,
                        each_price_cents: 14299,
                        link: new URL("https://amzn.to/3LEBDs0"),
                    });
                    break;
                case "htc_vive_trackers_3_0-3_trackers_1_continuous":
                    c.required.push({
                        name: "VIVE 3.0 Tracker",
                        comment: "for tracking",
                        count: 3,
                        each_price_cents: 14299,
                        link: new URL("https://amzn.to/3LEBDs0"),
                    });
                    c.required.push({
                        name: "VIVE 3.0 Tracker",
                        comment: "for continuous calibration",
                        count: 1,
                        each_price_cents: 14299,
                        link: new URL("https://amzn.to/3LEBDs0"),
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
            c.required.push({
                name: "HTC VIVE SteamVR Base Station 1.0",
                count: 2,
                each_price_cents: vrHeadsetsByKey[vrHeadsetKey].tracking === "lighthouse" ? 0 : 13499,
                link: new URL("https://amzn.to/48Y3v4m"),
            });
            c.optional.push({
                name: "Skywin VR Tripod Stand",
                comment: "to position base stations",
                count: 1,
                each_price_cents: 4699,
                link: new URL("https://amzn.to/4ojpbN7"),
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
        introExample: (function () {
            let vrHeadset: string;
            if (vrHeadsetsByKey[vrHeadsetKey].tracking === "lighthouse") {
                vrHeadset = "htc_vive";
            } else {
                vrHeadset = "meta_quest_3";
            }

            return (
                <VideoInView
                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/demo-dancing-sxs.mp4`}
                    className="sxs"
                />
            );
        })(),
        examples: (function () {
            let vrHeadset: string;
            if (vrHeadsetsByKey[vrHeadsetKey].tracking === "lighthouse") {
                vrHeadset = "htc_vive";
            } else {
                vrHeadset = "meta_quest_3";
            }

            return {
                standing: (
                    <VideoInView
                        src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/demo-standing-overlay.mp4`}
                        className="overlay"
                    />
                ),
                sitting: (
                    <VideoInView
                        src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/demo-sitting-overlay.mp4`}
                        className="overlay"
                    />
                ),
                sittingOnFloor: (
                    <VideoInView
                        src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/demo-sitting_on_floor-overlay.mp4`}
                        className="overlay"
                    />
                ),
                lyingDown: (
                    <VideoInView
                        src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/demo-lying_down-overlay.mp4`}
                        className="overlay"
                    />
                ),
                dancing: (
                    <VideoInView
                        src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/demo-dancing-overlay.mp4`}
                        className="overlay"
                    />
                ),
                exercise: (
                    <>
                        <VideoInView
                            src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/demo-exercise-overlay.mp4`}
                            className="overlay"
                        />
                        <p>
                            This took a few attempts, because the waist tracker would often lose tracking when I did
                            pushups.
                        </p>
                    </>
                ),
            };
        })(),
        review: {
            cost: (function () {
                if (vrHeadsetsByKey[vrHeadsetKey].tracking === "lighthouse") {
                    return {
                        score: 3,
                        content: (
                            <>
                                <p>
                                    <img src={`/${fbtSystemConfig.fbtSystemKey}/htc_vive_3_0.jpg`} />
                                </p>
                                <p>You will need to buy the trackers and straps.</p>
                            </>
                        ),
                    };
                } else if (fbtSystemConfig.key === "htc_vive_trackers_3_0-3_trackers_1_continuous") {
                    return {
                        score: 1,
                        content: (
                            <>
                                <p>
                                    <img src={`/${fbtSystemConfig.fbtSystemKey}/htc_vive_3_0.jpg`} />
                                </p>
                                <p>You will need to buy the trackers, straps, and Lighthouse base stations.</p>
                            </>
                        ),
                    };
                } else {
                    return {
                        score: 2,
                        content: (
                            <>
                                <p>
                                    <img src={`/${fbtSystemConfig.fbtSystemKey}/htc_vive_3_0.jpg`} />
                                </p>
                                <p>You will need to buy the trackers, straps, and Lighthouse base stations.</p>
                            </>
                        ),
                    };
                }
            })(),
            setup: {
                score: 4,
                content: (
                    <>
                        {vrHeadsetsByKey[vrHeadsetKey].tracking !== "lighthouse" && (
                            <p>
                                You will need to set up your Lighthouse base-stations. Mount each Lighthouse
                                base-stations to the wall or attach it to a tripod. Then complete the Lighthouse setup
                                flow in SteamVR.
                            </p>
                        )}
                        <img src="/htc_vive_trackers_3_0/steamvr_pair_tracker.png" />
                        <p>Connect the tracker dongles to your PC, and pair each tracker in SteamVR.</p>
                    </>
                ),
                drawbacks: [
                    {
                        title: "Dongle Interference",
                        content: (
                            <>
                                <p>TODO</p>
                                <p>
                                    The trackers communicate with dongles over Bluetooth. Unfortunately, they can
                                    interfere with each other. Interference will cause you to fly off into the distance.
                                </p>
                                <p>You will need to space the dongles apart using the provided cradles.</p>
                            </>
                        ),
                        collapsed: true,
                    },
                    {
                        title: "2.4Ghz Wi-Fi Interference",
                        content: (
                            <>
                                <img
                                    src={`/${fbtSystemConfig.fbtSystemKey}/limitations/htc_vive_trackers_3_0-wifi_interference.jpg`}
                                />
                                <p>
                                    The trackers communicate with dongles over Bluetooth, which shares the same band as
                                    2.4Ghz Wi-Fi routers. Interference will cause you to fly off into the distance.
                                </p>
                                <p>
                                    If you have a 2.4Ghz router, you will need to keep the dongles away from the router.
                                </p>
                            </>
                        ),
                        collapsed: true,
                    },
                ],
            },
            calibration: (function () {
                if (vrHeadsetsByKey[vrHeadsetKey].tracking === "lighthouse") {
                    const vrHeadset = "htc_vive";
                    return {
                        score: 5,
                        content: (
                            <>
                                <VideoInView
                                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/calibration.mp4`}
                                    className="sxs"
                                />
                                <p>Just put your headset and tracker on, and start playing!</p>
                            </>
                        ),
                    };
                } else if (fbtSystemConfig.key === "htc_vive_trackers_3_0-3_trackers_1_continuous") {
                    const vrHeadset = "meta_quest_3";
                    return {
                        score: 5,
                        content: (
                            <>
                                <VideoInView
                                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/calibration.mp4`}
                                    className="calibration"
                                />
                                <p>
                                    Just put your headset and tracker on, enable continuous calibration, and start
                                    playing!
                                </p>
                            </>
                        ),
                    };
                } else {
                    const vrHeadset = "meta_quest_3";
                    return {
                        score: 4,
                        content: (
                            <>
                                <VideoInView
                                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/calibration.mp4`}
                                    className="calibration"
                                />
                                <p>
                                    Since your headset is not Lighthouse-based, you will have to do space-calibration to
                                    align your headset’s playspace to the trackers’ playspace.
                                </p>
                            </>
                        ),
                    };
                }
            })(),
            gameplay: {
                score: 3,
                content: (
                    <>
                        <VideoInView
                            src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-exercise-sxs.mp4`}
                            className="sxs"
                        />
                        <p>
                            When the trackers can see the Lighthouse base stations, tracking is accurate and there is no
                            noticeable lag. Trackers handle fast and extreme movements with no problems.
                        </p>
                        <p>
                            However, if you accidentally block the trackers from the base stations, your body will
                            freeze or fly away into the distance. This is a sure sign that someone is using VIVE Tracker
                            3.0.
                        </p>
                    </>
                ),
                drawbacks: nonNullArray([
                    {
                        key: "occlusion",
                        title: "Occlusion",
                        content: (
                            <>
                                <p>
                                    If the trackers lose sight of the base stations, parts of your body will freeze in
                                    place, or fly off into the distance.
                                </p>
                                <VideoInView
                                    src={`/${fbtSystemConfig.fbtSystemKey}/3_trackers/meta_quest_3/fail-flying_into_distance-sxs.mp4`}
                                    className="sxs"
                                />
                                <p>When I move my arm in front of my waist tracker.</p>
                                <p>It takes a few seconds for the trackers to recover.</p>
                                <p>
                                    I actively think about where I move my arms and where I'm facing, to minimize this
                                    problem.
                                </p>
                            </>
                        ),
                    },
                    {
                        key: "reflections",
                        title: "Reflection Interference",
                        content: (
                            <>
                                <Carousel>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Carousel.Item key={i}>
                                            <img
                                                src={`/${fbtSystemConfig.fbtSystemKey}/limitations/htc_vive_trackers_3_0-reflections-${i + 1}.jpg`}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                                <p>
                                    Reflective items in your play space can reflect the infrared light from the base
                                    stations, and confuse your trackers. Randomly, you will fly off into the distance.
                                </p>
                                <p>
                                    You will need to close your curtains and cover any reflective surfaces like mirrors,
                                    your monitor and PC. (I have also had to turn off one of my floor lamps, although
                                    I'm not sure how it causes interference.)
                                </p>
                            </>
                        ),
                    },
                    vrHeadsetsByKey[vrHeadsetKey].tracking !== "lighthouse"
                        ? matchConfigOptional(fbtSystemConfig.key, {
                              "htc_vive_trackers_3_0-3_trackers": {
                                  key: "playspace_drift",
                                  title: "Playspace Drift",
                                  content: (
                                      <p>
                                          After a few hours of play, the headset playspace might have drifted away from
                                          the tracker playspace. Your avatar may look look like it's leaning towards the
                                          side. You can re-do Space Calibration to re-align the two playspaces.
                                      </p>
                                  ),
                                  collapsed: true,
                              },
                          })
                        : undefined,
                    {
                        key: "knee_position",
                        title: "Knee Accuracy",
                        content: (
                            <>
                                <p>
                                    The knee position is estimated using inverse kinematics (IK), since there is no
                                    tracker there. Since it is estimated, it might not match the actual position of your
                                    knees.
                                </p>
                                <VideoInView
                                    src={`/${fbtSystemConfig.fbtSystemKey}/3_trackers/meta_quest_3/fail-manspreading-sxs.mp4`}
                                    className="sxs"
                                />
                                <p>
                                    I tend to sit with my feet pointing outwards, so it always looks like I'm
                                    manspreading. There's no way to work around this behavior.
                                </p>
                            </>
                        ),
                        collapsed: true,
                    },
                ]),
            },
            comfort: {
                score: 4,
                content: (function () {
                    let vrHeadset: string;
                    if (vrHeadsetsByKey[vrHeadsetKey].tracking === "lighthouse") {
                        vrHeadset = "htc_vive";
                    } else {
                        vrHeadset = "meta_quest_3";
                    }

                    return (
                        <>
                            <img
                                src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/wearing.jpg`}
                            />
                            <p>
                                I use Trackstraps (purchased separately). I wear my waist tracker over my T-shirt, and
                                feet trackers over socks.
                            </p>
                            <p>The trackers are a little bulky, but I don't notice them during gameplay.</p>
                            {matchConfigOptional(fbtSystemConfig.key, {
                                "htc_vive_trackers_3_0-3_trackers_1_continuous": (
                                    <p>
                                        I mount my continuous calibration tracker to the top-front of my headset, and I
                                        don't notice it during gameplay. Depending on your headset, you may have to
                                        mount it on the back, which becomes noticeable in certain positions.
                                    </p>
                                ),
                            })}
                        </>
                    );
                })(),
            },
            overall: (function () {
                if (vrHeadsetsByKey[vrHeadsetKey].tracking === "lighthouse") {
                    return {
                        score: 4,
                        content: (
                            <>
                                <p>
                                    I enjoy using VIVE Tracker 3.0s because they are so easy to set up and use. They’re
                                    great when I just want to jump into VR for low energy activities like chatting with
                                    friends.
                                </p>
                                <p>
                                    I wish the occlusion problems weren't as bad. I can accept freezing in place. But
                                    whenever I fly into the distance, the conversation immediately turns to "VIVEs huh?"
                                    or "There he goes again."
                                </p>
                                <p>
                                    I actively think about where I move my arms and where I'm facing, to minimize this
                                    problem. And I'm still unable to fully control the problem.
                                </p>
                            </>
                        ),
                    };
                } else if (fbtSystemConfig.key === "htc_vive_trackers_3_0-3_trackers_1_continuous") {
                    return {
                        score: 3,
                        content: (
                            <>
                                <p>
                                    I enjoy using VIVE Tracker 3.0s because they are so easy to set up and use. They’re
                                    great when you just want to jump into VR for low energy activities like chatting
                                    with friends.
                                </p>
                                <p>
                                    However, I just cannot get used to the occlusion problems. I hate the freezing and
                                    flying off so much that I have to actively prevent it from happening. I move my arms
                                    in specific ways to prevent covering the hip tracker, and also try to keep facing at
                                    least one base station. This breaks the immersion for me.
                                </p>
                            </>
                        ),
                    };
                } else {
                    return {
                        score: 3,
                        content: (
                            <>
                                <p>
                                    I enjoy using VIVE Tracker 3.0s because they are so easy to set up and use. They’re
                                    great when you just want to jump into VR for low energy activities like chatting
                                    with friends.
                                </p>
                                <p>
                                    However, I just cannot get used to the occlusion problems. I hate the freezing and
                                    flying off so much that I have to actively prevent it from happening. I move my arms
                                    in specific ways to prevent covering the hip tracker, and also try to keep facing at
                                    least one base station. This breaks the immersion for me.
                                </p>
                            </>
                        ),
                    };
                }
            })(),
        },
    };
}
