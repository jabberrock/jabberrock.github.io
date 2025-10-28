import { Carousel } from "react-bootstrap";
import { SideBySideVideoPlayer } from "../components/SideBySideVideoPlayer";
import { SimpleImage } from "../components/SimpleImage";
import { SimpleVideoPlayer } from "../components/SimpleVideoPlayer";
import { VideoPlayer } from "../components/VideoPlayer";
import { fbtSystemConfigsByKey, fbtSystemsByKey, type FBTSystemConfigKey } from "../fbt/FBT";
import { vrHeadsetsByKey, type VRHeadsetKey, type VRSystem } from "../vr/VR";
import {
    ExampleVideoKeys,
    matchConfigOptional,
    nonNullArray,
    type Drawback,
    type ItemList,
    type VRFBTSystem,
} from "./VRFBTSystem";

export function makeHTCVive30(vrSystem: VRSystem, fbtConfigKey: FBTSystemConfigKey): VRFBTSystem {
    const fbtSystemConfig = fbtSystemConfigsByKey[fbtConfigKey];
    if (fbtSystemConfig.fbtSystemKey !== "htc_vive_trackers_3_0") {
        throw "Invalid FBT system config";
    }

    if (!vrSystem.prefersPCVR) {
        return {
            key: "none",
            name: fbtSystemsByKey[fbtSystemConfig.fbtSystemKey].name,
            imageURL: "htc_vive_trackers_3_0/htc_vive_3_0.jpg",
            recommendation: <p className="warning">VIVE Tracker 3.0 requires a PC.</p>,
            howItWorks: <p>N/A</p>,
            itemList: { required: [], optional: [] },
            availability: <p>N/A</p>,
            tracking: <p>N/A</p>,
            specs: <p>N/A</p>,
            examples: {},
            drawbacks: [],
        };
    }

    if (
        vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse" &&
        fbtSystemConfig.key === "htc_vive_trackers_3_0-3_trackers_1_continuous"
    ) {
        return {
            key: "none",
            name: fbtSystemsByKey[fbtSystemConfig.fbtSystemKey].name,
            imageURL: "htc_vive_trackers_3_0/htc_vive_3_0.jpg",
            recommendation: (
                <p className="warning">Your headset is Lighthouse-based and does not require continuous calibration.</p>
            ),
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
        name: fbtSystemsByKey[fbtSystemConfig.fbtSystemKey].name,
        imageURL: "htc_vive_trackers_3_0/htc_vive_3_0.jpg",
        recommendation: (function () {
            if (fbtSystemConfig.key === "htc_vive_trackers_3_0-3_trackers") {
                if (vrHeadsetsByKey[vrSystem.headset].tracking !== "lighthouse") {
                    return (
                        <div>
                            <p className="warning">
                                HTC VIVE Trackers 3.0 without continuous calibration is not recommended for your
                                headset.
                            </p>
                        </div>
                    );
                } else {
                    return <p className="recommended">HTC VIVE Trackers 3.0 are compatible with your headset.</p>;
                }
            } else if (fbtSystemConfig.key === "htc_vive_trackers_3_0-3_trackers_1_continuous") {
                if (vrHeadsetsByKey[vrSystem.headset].tracking !== "lighthouse") {
                    return (
                        <p className="recommended">
                            HTC VIVE Trackers 3.0 with continuous calibration is compatible with your headset.
                        </p>
                    );
                }
            }
        })(),
        howItWorks: (
            <>
                <img src="htc_vive_trackers_3_0/lighthouse_based_systems.jpg" />
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
            };
            switch (fbtSystemConfig.key) {
                case "htc_vive_trackers_3_0-3_trackers":
                    c.required.push({
                        name: "VIVE 3.0 Tracker",
                        count: 3,
                        each_price_cents: 14900,
                        link: new URL("https://www.vive.com/us/accessory/tracker3/"),
                    });
                    break;
                case "htc_vive_trackers_3_0-3_trackers_1_continuous":
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
            switch (fbtSystemConfig.key) {
                case "htc_vive_trackers_3_0-3_trackers":
                    return (
                        <>
                            <div>3 point tracking (Chest, 2x Feet)</div>
                            <div>Knees and ankles estimated with inverse kinematics (IK).</div>
                        </>
                    );
                case "htc_vive_trackers_3_0-3_trackers_1_continuous":
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
                    video_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-dancing.mp4`}
                    thumbnail_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-dancing.jpg`}
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
        drawbacks: (function () {
            const drawbacks: Drawback[] = [];

            if (
                vrHeadsetsByKey[vrSystem.headset].tracking !== "lighthouse" &&
                fbtSystemConfig.key !== "htc_vive_trackers_3_0-3_trackers_1_continuous"
            ) {
                drawbacks.push({
                    key: "calibration",
                    title: "Space Calibration",
                    content: (
                        <>
                            <img style={{ width: "480px", height: "320px" }} />
                            <div className="sub-header">Space Calibration</div>
                            <p>HTC VIVE Trackers 3.0 and your headset have separate playspaces.</p>
                            <p>
                                You will need to perform Space Calibration to match the two playspaces. This is done at
                                the start of each VR session and whenever your headset playspace shifts (which happens a
                                lot).
                            </p>
                            <p>
                                If you choose HTC VIVE Trackers 3.0, we recommend using continuous calibration with an
                                extra tracker to avoid manual Space Calibration.
                            </p>
                        </>
                    ),
                });
            }

            drawbacks.push({
                key: "occlusion",
                title: "Occlusion",
                content: (
                    <>
                        <img style={{ width: "480px", height: "320px" }} />
                        <div className="sub-header">Occlusion</div>
                        <p>
                            During play, your arms and clothing may hide the tracker from the base stations. This
                            occlusion causes the tracker to stop moving, or even fly off into the distance.
                        </p>
                        <p>
                            This can be minimized by careful position of the base stations, wearing tight clothing, and
                            being careful of where you move your arms.
                        </p>
                    </>
                ),
            });

            drawbacks.push({
                key: "interference",
                title: "Interference",
                content: (
                    <>
                        <Carousel>
                            {Array.from({ length: 5 }, (_, i) => (
                                <Carousel.Item key={i}>
                                    <SimpleImage
                                        src={`${fbtSystemConfig.fbtSystemKey}/limitations/htc_vive_trackers_3_0-reflections-${i + 1}.jpg`}
                                        width={480}
                                        height={320}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <div className="sub-header">Interference</div>
                        <p>
                            The base stations use infrared light, which can bounce off reflective surfaces. This
                            confuses the tracker and causes it to fly off into the distance. To solve this, close your
                            window blinds, cover your mirrors with a cloth, and cover any other reflective surfaces.
                        </p>
                        <p>
                            Your 2.4Ghz router can overpower the dongles if it is placed too close. To solve this, move
                            your dongles away from the router.
                        </p>
                    </>
                ),
            });

            return drawbacks;
        })(),
        vrSession: {
            setup: (function () {
                if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                    return <p>Turn on your trackers and put them on.</p>;
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
                                src={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-vr_session_setup.mp4`}
                                thumbnail={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-vr_session_setup.jpg`}
                                width={480}
                                height={420}
                            />
                            <ol>
                                <li>Turn on one tracker</li>
                                <li>Start OVR Space Calibrator, tightly hold the tracker and your controller</li>
                                <li>
                                    Start the space calibration process, and wave your tracker and controller in a
                                    figure of 8
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
                fbtSystemConfig.key === "htc_vive_trackers_3_0-3_trackers_1_continuous" ? (
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
            cost: (function () {
                if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                    return {
                        score: 3,
                        content: <p>You will need to buy the trackers and straps.</p>,
                    };
                } else if (fbtSystemConfig.key === "htc_vive_trackers_3_0-3_trackers_1_continuous") {
                    return {
                        score: 1,
                        content: <p>You will need to buy the trackers, straps, and Lighthouse base stations.</p>,
                    };
                } else {
                    return {
                        score: 2,
                        content: <p>You will need to buy the trackers, straps, and Lighthouse base stations.</p>,
                    };
                }
            })(),
            setup: {
                score: 4,
                content: (
                    <>
                        <p>Setup was easy.</p>
                        {vrHeadsetsByKey[vrSystem.headset].tracking !== "lighthouse" && (
                            <p>
                                You will need to set up your Lighthouse base-stations. Mount each Lighthouse
                                base-stations to the wall or attach it to a tripod. Then complete the Lighthouse setup
                                flow in SteamVR.
                            </p>
                        )}
                        <p>Connect the tracker dongles to your PC, and pair each tracker in SteamVR.</p>
                    </>
                ),
                drawbacks: [
                    {
                        key: "interference",
                        title: "Dongle and 2.4Ghz Wi-Fi Interference",
                        content: (
                            <>
                                <SimpleImage
                                    src={`${fbtSystemConfig.fbtSystemKey}/limitations/htc_vive_trackers_3_0-wifi_interference.jpg`}
                                    width={480}
                                    height={320}
                                />
                                <p>
                                    The trackers communicate with dongles over Bluetooth, which shares the same band as
                                    2.4Ghz Wi-Fi routers. Interference will cause you to fly off into the distance.
                                </p>
                                <p>
                                    You will need to space the dongles apart using the provided cradles, and keep them
                                    away from your router if your router's 2.4Ghz band is active.
                                </p>
                            </>
                        ),
                    },
                ],
            },
            calibration: (function () {
                if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                    const vrHeadset = "htc_vive";
                    return {
                        score: 5,
                        content: (
                            <>
                                <SimpleVideoPlayer
                                    src={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-vr_session_setup.mp4`}
                                    thumbnail={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-vr_session_setup.jpg`}
                                    width={480}
                                    height={420}
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
                                <SimpleVideoPlayer
                                    src={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-vr_session_setup.mp4`}
                                    thumbnail={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-vr_session_setup.jpg`}
                                    width={480}
                                    height={420}
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
                                <SimpleVideoPlayer
                                    src={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-vr_session_setup.mp4`}
                                    thumbnail={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrHeadset}/${fbtSystemConfig.key}-${vrHeadset}-vr_session_setup.jpg`}
                                    width={480}
                                    height={420}
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
                        <SideBySideVideoPlayer
                            video_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-dancing.mp4`}
                            thumbnail_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-dancing.jpg`}
                            width={480}
                            height={320}
                        />
                        <p>
                            Tracking is accurate and there is no noticeable lag. Trackers handle fast and extreme
                            movements with no problems.
                        </p>
                    </>
                ),
                drawbacks: nonNullArray([
                    {
                        key: "occlusion",
                        title: "Occlusion",
                        content: (
                            <>
                                <SideBySideVideoPlayer
                                    video_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-exercise.mp4`}
                                    thumbnail_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-exercise.jpg`}
                                    width={480}
                                    height={320}
                                />
                                <p>
                                    If the trackers lose sight of the base stations, parts of your body will freeze in
                                    place, or fly off into the distance. This can easily happen if you move your arm in
                                    front of your chest tracker, or if you just bend down a bit. Simple actions like
                                    sitting down can cause occlusion.
                                </p>
                                <p>It takes a few seconds for the trackers to recover.</p>
                                <p>
                                    I notice having to be careful how I move my arms, and to keep myself oriented
                                    towards a base station. This breaks the immersion because I’m constantly worrying
                                    whether I’m going to break tracking.
                                </p>
                                <p>
                                    (While recording the demo videos, I made 5 attempts before getting a recording
                                    without occlusion. I had to twist my body slightly in the direction of the base
                                    stations to record the exercise video.)
                                </p>
                            </>
                        ),
                    },
                    vrHeadsetsByKey[vrSystem.headset].tracking !== "lighthouse"
                        ? matchConfigOptional(fbtSystemConfig.key, {
                              "htc_vive_trackers_3_0-3_trackers": {
                                  key: "playspace_reset",
                                  title: "Random Playspace Resets",
                                  content: (
                                      <p>
                                          During play, your headset may randomly reset its playspace. Your avatar will
                                          fly off to a random position. You will need to re-do space-calibration.
                                      </p>
                                  ),
                              },
                              "htc_vive_trackers_3_0-3_trackers_1_continuous": {
                                  key: "playspace_reset",
                                  title: "Random Playspace Resets",
                                  content: (
                                      <p>
                                          During play, your headset may randomly reset its playspace. Your avatar will
                                          fly off to a random position. But continuous calibration will re-align the two
                                          spaces after a few seconds.
                                      </p>
                                  ),
                              },
                          })
                        : undefined,
                    {
                        key: "reflections",
                        title: "Reflections",
                        content: (
                            <>
                                <Carousel>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Carousel.Item key={i}>
                                            <SimpleImage
                                                src={`${fbtSystemConfig.fbtSystemKey}/limitations/htc_vive_trackers_3_0-reflections-${i + 1}.jpg`}
                                                width={480}
                                                height={320}
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
                ]),
                rating: (
                    <>
                        <p>VIVE Tracker 3.0 gets a 3/5 for tracking.</p>
                        <p>
                            It loses 2 points because occlusion causes your body to fly off into the distance, which
                            breaks immersion.
                        </p>
                    </>
                ),
            },
            comfort: {
                score: 4,
                content: (
                    <>
                        <p>
                            I use Trackstraps (purchased separately). I wear my waist tracker over my T-shirt, and feet
                            trackers over socks.
                        </p>
                        <p>The trackers are a little bulky, but I don't notice them during gameplay.</p>
                        {matchConfigOptional(fbtSystemConfig.key, {
                            "htc_vive_trackers_3_0-3_trackers_1_continuous": (
                                <p>
                                    I mount my continuous calibration tracker to the top-front of my headset, and I
                                    don't notice it during gameplay. Depending on your headset, you may have to mount it
                                    on the back, which becomes noticeable in certain positions.
                                </p>
                            ),
                        })}
                    </>
                ),
            },
            overall: (function () {
                if (vrHeadsetsByKey[vrSystem.headset].tracking === "lighthouse") {
                    return {
                        score: 4,
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
                                <p>
                                    When my headset randomly resets its playspace, my avatar flies off into the
                                    distance. That’s another huge immersion breaker for me.
                                </p>
                            </>
                        ),
                    };
                } else {
                    return {
                        score: 2,
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
                                <p>
                                    When my headset randomly resets its playspace, my avatar flies off into the
                                    distance. I have to pause everything and do space-calibration. That’s another huge
                                    immersion breaker for me.
                                </p>
                            </>
                        ),
                    };
                }
            })(),
        },
    };
}
