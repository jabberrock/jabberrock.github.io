import type React from "react";
import { ExampleVideoKeys, type ItemList, type VRFBTSystem } from "./VRFBTSystem";
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
        name: fbtSystemsByKey[fbtSystemConfig.fbtSystemKey].name,
        imageURL: "slimevr_trackers/slimevr.jpg",
        recommendation: (function () {
            return (
                <>
                    <p className="recommended">SlimeVR Trackers are compatible with your headset.</p>
                    {fbtSystemConfig.key === "slimevr_trackers-lower_body_set_5_0" && (
                        <p>
                            We recommend the Core Set (which has an extra hip tracker) for more expressive upper body
                            tracking.
                        </p>
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
                <p>
                    The Core Set contains 6 trackers for your chest, hip, thighs and ankles. Feet are estimated based on
                    your ankles and how close they are to the ground.
                </p>
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
                <p>Pre-order now for the next shipment (estimated shipping to customers in Nov 2025)</p>
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
        drawbacks: (
            <>
                <div className="drawback">
                    <img style={{ width: "480px", height: "320px" }} />
                    <div className="sub-header">Drift</div>
                    <p>
                        Over time, SlimeVR trackers will drift, because the IMU is not perfect. Your in-game avatar will
                        gradually get out of sync with your real body.
                    </p>
                    <p>
                        Typical users notice drift after 30-45 minutes. When Stay Aligned is configured, some users who
                        are just hanging out with friends have reported no drift for up to 5 hours.
                    </p>
                    <p>To fix the drift, just face forward, and double tap your chest tracker.</p>
                </div>
                <div className="drawback">
                    <img style={{ width: "480px", height: "320px" }} />
                    <div className="sub-header">Calibration</div>
                    <p>
                        At the start of each VR session, you will need to calibrate the trackers so that the skeleton
                        will make your body in the real world. The calibration process can be a little tricky, and
                        requires some adjustment for each person.
                    </p>
                    <p>SlimeVR runs VRChat calibration sessions where you can get help with calibration.</p>
                </div>
            </>
        ),
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
                score: 5,
                content: (
                    <>
                        <p>SlimeVR trackers are one of the lowest cost systems today.</p>
                        <p>
                            However, official SlimeVR trackers are sold through a pre-order system, and shipments are
                            sent out every 3-4 months. The next major shipment (S15) is estimated to be mid-Nov 2025.
                        </p>
                    </>
                ),
            },
            tracking: {
                score: 4,
                content: (
                    <>
                        <p>
                            SlimeVR provides high quality tracking when using modern IMUs (e.g. ICM45686 used in
                            official SlimeVR trackers).
                        </p>
                        <p>
                            They track you in any position, whether you’re standing around, dancing, doing yoga, or
                            lying under a blanket.
                        </p>
                        <p>
                            However, SlimeVR trackers will drift over time. With the latest IMUs, you can easily play
                            for 45 mins without noticing drift. It is very easy to fix drift: just face forward and
                            double tap your chest tracker.
                        </p>
                        <p>
                            With optional features like Stay Aligned, I can sometimes go 4-5 hours without noticing any
                            drift.
                        </p>
                    </>
                ),
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
                            For most people, the calibration process just works. However, for others, it may require
                            some trial and error. I am bow-legged, so I have to be careful how I orient my knees during
                            calibration. SlimeVR provides VRChat calibration sessions to help you figure out the
                            calibration method. They’re also continuing to improve the process.
                        </p>
                        <p>
                            I think the calibration process learning curve is the biggest drawback of SlimeVR. However,
                            once you figure out calibration, it works every time.
                        </p>
                    </>
                ),
            },
            overall: {
                score: 4,
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
                    </>
                ),
            },
        },
    };
}
