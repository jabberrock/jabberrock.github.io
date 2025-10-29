import type React from "react";
import {
    ExampleVideoKeys,
    matchConfig,
    matchConfigOptional,
    nonNullArray,
    type ItemList,
    type VRFBTSystem,
} from "./VRFBTSystem";
import { fbtSystemConfigsByKey, fbtSystemsByKey, type FBTSystemConfigKey } from "../fbt/FBT";
import { VideoPlayer } from "../components/VideoPlayer";
import { vrHeadsetsByKey, type VRHeadsetKey, type VRSystem } from "../vr/VR";
import { SideBySideVideoPlayer } from "../components/SideBySideVideoPlayer";
import { SimpleVideoPlayer } from "../components/SimpleVideoPlayer";

export function makeSlimeVR(vrSystem: VRSystem, fbtConfigKey: FBTSystemConfigKey): VRFBTSystem {
    const fbtSystemConfig = fbtSystemConfigsByKey[fbtConfigKey];
    if (fbtSystemConfig.fbtSystemKey !== "slimevr_trackers") {
        throw "Invalid FBT system config";
    }

    return {
        key: fbtSystemConfig.key,
        name: fbtSystemsByKey[fbtSystemConfig.fbtSystemKey].name,
        imageURL: "slimevr_trackers/slimevr.jpg",
        recommendation: (function () {
            return (
                <>
                    <p className="recommended">SlimeVR Trackers are compatible with your headset.</p>
                    {fbtSystemConfig.key === "slimevr_trackers-lower_body_set_5_0" && (
                        <p>We recommend the Core Set (6+0) for significantly more accurate tracking.</p>
                    )}
                </>
            );
        })(),
        howItWorks: (
            <>
                <img src="slimevr_trackers/slimevr_skeleton.jpg" />
                <p>
                    SlimeVR is an IMU-based (Inertial Measurement Unit) system. It uses a gyroscope to measure the
                    rotation of each bone, and then reconstruct the skeleton, starting from the headset.
                </p>
                {matchConfig(fbtSystemConfig.key, {
                    "slimevr_trackers-lower_body_set_5_0": (
                        <p>
                            The Lower Body Set (5+0) contains 5 trackers for your chest, 2x thighs and 2x ankles. Feet
                            are estimated based on your ankles and how close they are to the ground.
                        </p>
                    ),
                    "slimevr_trackers-core_set_6_0": (
                        <p>
                            The Core Set (6+0) contains 6 trackers for your chest, hip, 2x thighs and 2x ankles. Feet
                            are estimated based on your ankles and how close they are to the ground.
                        </p>
                    ),
                    "slimevr_trackers-enhanced_core_set_6_2": (
                        <p>
                            The Enhanced Core Set (6+2) contains 6 main trackers for your chest, hip, 2x thighs and 2x
                            ankles, and 2 extension trackers for your 2x feet.
                        </p>
                    ),
                    "slimevr_trackers-full_body_set_8_2": (
                        <p>
                            The Full Body Set (8+2) contains 8 main trackers for your chest, hip, 2x arms, 2x thighs and
                            2x ankles, and 2 extension trackers for your 2x feet.
                        </p>
                    ),
                })}
            </>
        ),
        itemList: (function () {
            const c: ItemList = {
                required: [],
                optional: [],
            };
            switch (fbtSystemConfig.key) {
                case "slimevr_trackers-lower_body_set_5_0":
                    c.required.push({
                        name: "Lower-Body Set v1.2 (5+0)",
                        count: 1,
                        each_price_cents: 21900,
                        link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"),
                    });
                    break;
                case "slimevr_trackers-core_set_6_0":
                    c.required.push({
                        name: "Core Set v1.2 (6+0)",
                        count: 1,
                        each_price_cents: 25900,
                        link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"),
                    });
                    break;
                case "slimevr_trackers-enhanced_core_set_6_2":
                    c.required.push({
                        name: "Enhanced Core Set v1.2 (6+2)",
                        count: 1,
                        each_price_cents: 32500,
                        link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"),
                    });
                    break;
                case "slimevr_trackers-full_body_set_8_2":
                    c.required.push({
                        name: "Full Body Set v1.2 (8+2)",
                        count: 1,
                        each_price_cents: 41500,
                        link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"),
                    });
                    break;
            }
            c.optional.push({
                name: "GoPro Harness",
                comment: "for more stable chest tracker",
                count: 1,
                each_price_cents: 1449,
                link: new URL("https://www.amazon.com/AmazonBasics-Chest-Mount-Harness-cameras/dp/B01D3I8A7A"),
            });
            c.optional.push({
                name: "10-Port USB Charger",
                comment: "for easier charging",
                count: 1,
                each_price_cents: 1362,
                link: new URL(
                    "https://www.amazon.com/Charging-Technology-Guaranteed-Family-Sized-Multiple/dp/B07XXDS86V",
                ),
            });
            return c;
        })(),
        availability: (
            <>
                <p>
                    Official SlimeVR Trackers
                    <br />
                    <a href="https://slimevr.dev/" target="_blank">
                        slimevr.dev
                    </a>
                </p>
                <p>
                    Official SlimeVR trackers are sold through a pre-order system, and shipments are sent out every 3-4
                    months. The next major shipment (S15) is estimated to be early December 2025.
                </p>
                <hr />
                <p>
                    3rd-Party Slime Trackers
                    <br />
                    <a href="https://discord.com/channels/817184208525983775/1058335815614341240" target="_blank">
                        #marketplace-forum
                    </a>
                </p>
                <p>SlimeVR-managed marketplace for verified sellers. Delivery may be much faster. Prices vary.</p>
                <p className="warning">
                    3rd-party Slime Trackers from Amazon, Ebay, Etsy, AliExpress or VRChat ARE NOT RECOMMENDED. You will
                    likely receive over-priced and low quality trackers, with poor customer support.
                </p>
            </>
        ),
        tracking: (function () {
            switch (fbtSystemConfig.key) {
                case "slimevr_trackers-lower_body_set_5_0":
                    return (
                        <>
                            <div>5 point tracking (Chest, 2x Thigh, 2x Ankle)</div>
                            <div>Feet are estimated based on ankles, and how close they are to the ground.</div>
                        </>
                    );
                case "slimevr_trackers-core_set_6_0":
                    return (
                        <>
                            <div>6 point tracking (Chest, Hip, 2x Thigh, 2x Ankle)</div>
                            <div>Two trackers on the upper body provide more expressiveness.</div>
                            <div>Feet are estimated based on ankles, and how close they are to the ground.</div>
                        </>
                    );
                case "slimevr_trackers-enhanced_core_set_6_2":
                    return (
                        <>
                            <div>8 point tracking (Chest, Hip, 2x Thigh, 2x Ankle, 2x Feet)</div>
                            <div>Two trackers on the upper body provide more expressiveness.</div>
                        </>
                    );
                case "slimevr_trackers-full_body_set_8_2":
                    return (
                        <>
                            <div>10 point tracking (Chest, Hip, 2x Thigh, 2x Ankle, 2x Feet, 2x Elbows)</div>
                            <div>Two trackers on the upper body provide more expressiveness.</div>
                        </>
                    );
            }
        })(),
        specs: (
            <>
                <div>Up to 12 hours</div>
                <div>12 g / 0.4 oz per tracker</div>
                <div>14 cm³ (62 x 32 x 7 mm)</div>
                <img src="slimevr_trackers/slimevr_size.jpg" />
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
        drawbacks: [
            {
                key: "drift",
                title: "Drift",
                content: (
                    <>
                        <img style={{ width: "480px", height: "320px" }} />
                        <div className="sub-header">Drift</div>
                        <p>
                            Over time, SlimeVR trackers will drift, because the IMU is not perfect. Your in-game avatar
                            will gradually get out of sync with your real body.
                        </p>
                        <p>
                            Typical users notice drift after 30-45 minutes. When Stay Aligned is configured, some users
                            who are just hanging out with friends have reported no drift for up to 5 hours.
                        </p>
                        <p>To fix the drift, just face forward, and double tap your chest tracker.</p>
                    </>
                ),
            },
            {
                key: "calibration",
                title: "Calibration",
                content: (
                    <>
                        <img style={{ width: "480px", height: "320px" }} />
                        <div className="sub-header">Calibration</div>
                        <p>
                            At the start of each VR session, you will need to calibrate the trackers so that the
                            skeleton will make your body in the real world. The calibration process can be a little
                            tricky, and requires some adjustment for each person.
                        </p>
                        <p>SlimeVR runs VRChat calibration sessions where you can get help with calibration.</p>
                    </>
                ),
            },
        ],
        vrSession: {
            setup: (function () {
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
                            <li>Turn on your trackers, and leave them on a flat surface for 10 seconds</li>
                            <li>Put your trackers</li>
                            <li>Start the SlimeVR software</li>
                            <li>Face forward, and click the "Full Reset" button</li>
                            <li>Ski-pose, and click the "Mounting Reset" button</li>
                            <li>Start VRChat</li>
                            <li>T-pose, and click the "FBT Calibration" button</li>
                        </ol>
                    </>
                );
            })(),
            play: (
                <>
                    <p>Play normally.</p>
                    <p>
                        If you notice that your avatar is off center, face forward, and double tap your Chest tracker.
                        This will do a "Yaw Reset" and re-align your avatar.
                    </p>
                    <p>
                        If your trackers shift on your body, you will need to adjust them, then re-do "Full Reset" and
                        "Mounting Reset".
                    </p>
                </>
            ),
        },
        review: {
            cost: {
                score: matchConfig<number>(fbtSystemConfig.key, {
                    "slimevr_trackers-lower_body_set_5_0": 5,
                    "slimevr_trackers-core_set_6_0": 5,
                    "slimevr_trackers-enhanced_core_set_6_2": 4,
                    "slimevr_trackers-full_body_set_8_2": 3,
                }),
                content: (
                    <>
                        <p>SlimeVR trackers are one of the most affordable systems today.</p>
                    </>
                ),
            },
            setup: {
                score: 3,
                content: (
                    <>
                        <p>
                            Download the SlimeVR server and follow the setup flow. It will prompt you to enter your
                            Wi-Fi details, connect each tracker, and then assign each tracker to a body part.
                        </p>
                        <p>
                            In my opinion, somes parts of the flow are confusing to first-timers. It tries to teach the
                            calibration process in 2 screens, without telling the player if they did a good job. It also
                            has a VR-driven body proportions system which people often misconfigure.
                        </p>
                    </>
                ),
                drawbacks: [
                    {
                        key: "wifi",
                        title: "2.4Ghz Wi-Fi Only",
                        content: (
                            <>
                                <p>
                                    SlimeVR trackers can only connect to 2.4Ghz Wi-Fi with WPA2. All routers support
                                    2.4Ghz Wi-Fi, but you may need to enable it. You may also have to change your
                                    encryption to WPA2.
                                </p>
                                <p>
                                    SlimeVR trackers probably won't work if you're connected to a central system like a
                                    dorm network. You can use a travel router, or use Windows Mobile Hotspot if your
                                    computer has a Wi-Fi card.
                                </p>
                            </>
                        ),
                        collapsed: true,
                    },
                ],
            },
            calibration: {
                score: 2,
                content: (
                    <>
                        <SimpleVideoPlayer
                            src={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/${fbtSystemConfig.key}-meta_quest_3-vr_session_setup.mp4`}
                            thumbnail={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/${fbtSystemConfig.key}-meta_quest_3-vr_session_setup.jpg`}
                            width={480}
                            height={420}
                        />
                        <p>At the start of each VR session, you will need to calibrate your trackers to your body.</p>
                        <p>
                            For most people, the calibration process just works. However, you will need some trial and
                            error to perfect it.
                        </p>
                        {matchConfigOptional(fbtSystemConfig.key, {
                            "slimevr_trackers-full_body_set_8_2": (
                                <p>
                                    The Full Body Set (8+2) provides 2 trackers for your upper arms for elbow tracking.
                                    You will need to hold your arms in a specific pose during calibration, and it can
                                    make the process even more difficult. I don't recommend getting elbow trackers
                                    unless you really want it for dancing.
                                </p>
                            ),
                        })}
                        <p>
                            I think the calibration process learning curve is the biggest drawback of SlimeVR. However,
                            once you figure out calibration, it works every time.
                        </p>
                    </>
                ),
                drawbacks: [
                    {
                        key: "personalized_calibration",
                        title: "Personalized Calibration",
                        content: (
                            <>
                                <p>For most people, the calibration process just works.</p>
                                <p>
                                    However, depending on your body type, you may need to learn some tricks to improve
                                    your calibration.
                                </p>
                                <p>
                                    I am bow-legged, so I have to be careful how I orient my knees during the "full
                                    reset" pose. Otherwise, my knees will cross each other if I sit down.
                                </p>
                                <p>
                                    SlimeVR provides VRChat calibration sessions to help you improve your calibration.
                                    They’re also continuing to improve the process.
                                </p>
                            </>
                        ),
                    },
                ],
            },
            gameplay: {
                score: matchConfig<number>(fbtSystemConfig.key, {
                    "slimevr_trackers-lower_body_set_5_0": 3,
                    "slimevr_trackers-core_set_6_0": 4,
                    "slimevr_trackers-enhanced_core_set_6_2": 4,
                    "slimevr_trackers-full_body_set_8_2": 4,
                }),
                content: (
                    <>
                        <SideBySideVideoPlayer
                            video_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-exercise.mp4`}
                            thumbnail_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-exercise.jpg`}
                            width={480}
                            height={320}
                        />
                        <p>
                            SlimeVR works in any position, whether you're standing, sitting, lying down, dancing or
                            exercising.
                        </p>
                        <SideBySideVideoPlayer
                            video_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-lying_down.mp4`}
                            thumbnail_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-lying_down.jpg`}
                            width={480}
                            height={320}
                        />
                        <p>Trackers even work when you're under a blanket, or if you're wearing a sweater over them.</p>
                        <p>
                            If you have calibrated well, tracking is accurate. However, as mentioned above, it takes
                            time and practice to learn to calibrate well.
                        </p>
                        <p>
                            There is no noticeable lag, and trackers handle fast and extreme movements with no problems.
                        </p>
                        <p>
                            SlimeVR trackers will experience drift after some time (45 minutes on modern IMUs). It is
                            easy to re-align your body: just face forward and double tap your chest tracker.
                        </p>
                    </>
                ),
                drawbacks: nonNullArray([
                    matchConfigOptional(fbtSystemConfig.key, {
                        "slimevr_trackers-lower_body_set_5_0": {
                            key: "sitting_bending",
                            title: "Sitting/Bending",
                            content: (
                                <>
                                    <SideBySideVideoPlayer
                                        video_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-sitting.mp4`}
                                        thumbnail_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-sitting.jpg`}
                                        width={480}
                                        height={320}
                                    />
                                    <p>
                                        The Lower Body Set (5+0) only provides a single chest tracker for your upper
                                        body. When you sit down or bend forwards, your legs tend to appear in front of
                                        where your real legs are.
                                    </p>
                                    <p>
                                        I strongly recommend getting at least the Core Set (6+0) which provides a chest
                                        and hip tracker. Together, these help SlimeVR tracker your upper body
                                        accurately.
                                    </p>
                                </>
                            ),
                        },
                    }),
                    {
                        key: "drift",
                        title: "Drift",
                        content: (
                            <>
                                <SideBySideVideoPlayer
                                    video_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-sitting.mp4`}
                                    thumbnail_url={`${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/${vrSystem.headset}/${fbtSystemConfig.key}-${vrSystem.headset}-sitting.jpg`}
                                    width={480}
                                    height={320}
                                />
                                <p>
                                    SlimeVR trackers will drift over time, because errors accumulate in the IMU. You
                                    will notice that your avatar is slightly off from your real body.
                                </p>
                                <p>
                                    With modern IMUs, you can easily play for 45 minutes without noticing any drift.
                                    When the optional Stay Aligned feature is enabled, I can go 4-5 hours without
                                    noticing any drift.
                                </p>
                                <p>
                                    It is very easy to fix drift: just face forward and double tap your chest tracker.
                                </p>
                                <p>
                                    (Official SlimeVR trackers use ICM45686, which is a modern IMU. Some 3rd party Slime
                                    trackers use low quality IMUs which drift much quicker.)
                                </p>
                            </>
                        ),
                    },
                    {
                        key: "bad_calibration",
                        title: "Bad Calibration",
                        content: (
                            <>
                                <p>
                                    Accurate SlimeVR tracking depends on having a good calibration. If you don't learn
                                    how to get a good calibration, your legs will move in strange ways.
                                </p>
                                <p>TODO: Video</p>
                                <p>When you are walking, you may notice your legs move to the side.</p>
                                <p>TODO: Video</p>
                                <p>
                                    When you are sitting, you may notice that your legs are too far apart, or too close
                                    and cross each other. You may also notice that your knees are too high.
                                </p>
                                <p>If you learn how to calibrate well, you will not have these problems.</p>
                            </>
                        ),
                    },
                ]),
            },
            comfort: {
                score: 4,
                content: (
                    <>
                        <p>SlimeVR provides elastic straps with silicone lines for grip.</p>
                        <p>
                            I typically wear my upper body trackers over my T-shirt, my leg trackers on my skin, and
                            feet trackers over socks. The trackers are light and comfortable to wear, and I don't notice
                            them during gameplay.
                        </p>
                        <p>
                            I recommend using a Go-Pro chest harness (purchased separately) for the chest tracker, so
                            that it doesn't slip downwards during gameplay.
                        </p>
                    </>
                ),
                drawbacks: [
                    {
                        key: "skin_sensitivity",
                        title: "Tactile/Skin Sensitivity",
                        content: (
                            <>
                                <p>Some people dislike putting straps directly on their skin.</p>
                                <p>
                                    You can wear the leg trackers over clothes, but I recommend tight pants like yoga
                                    pants. If you're wearing something like jeans, you will need to tighten the straps
                                    much more to prevent slipping.
                                </p>
                            </>
                        ),
                        collapsed: true,
                    },
                ],
            },
            overall: {
                score: matchConfig<number>(fbtSystemConfig.key, {
                    "slimevr_trackers-lower_body_set_5_0": 3,
                    "slimevr_trackers-core_set_6_0": 4,
                    "slimevr_trackers-enhanced_core_set_6_2": 4,
                    "slimevr_trackers-full_body_set_8_2": 4,
                }),
                content: (
                    <>
                        <p>
                            I really enjoy using SlimeVR trackers because I can freely do anything in VR and be
                            confident that my avatar matches me.
                        </p>
                        <p>
                            Once or twice a play session, I will need to fix drift, but it’s a simple double tap. It is
                            not a difficult or painful process at all.
                        </p>
                        <p>
                            However, you will need to have patience at the start, as you figure out how calibration
                            works best for your body.
                        </p>
                        {matchConfigOptional(fbtSystemConfig.key, {
                            "slimevr_trackers-lower_body_set_5_0": (
                                <p>
                                    I strongly recommend getting at least the Core Set (6+0) which provides a chest and
                                    hip tracker. The positions of your legs will be much better.
                                </p>
                            ),
                        })}
                    </>
                ),
            },
        },
    };
}
