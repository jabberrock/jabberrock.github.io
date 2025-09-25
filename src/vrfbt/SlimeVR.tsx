import type React from "react";
import { VideoPlayer } from "../components/VideoPlayer";
import { ExampleVideoKeys, type ItemList, type VRFBTSystem } from "./VRFBTSystem";
import { fbtSystemsByKey, type FBTSystemKey } from "../fbt/FBT";

const SlimeVRSystemKey: FBTSystemKey = "slimevr_1_2";

export function makeSlimeVR(fbtConfig: string): VRFBTSystem {
    return {
        key: `${SlimeVRSystemKey}-${fbtConfig}`,
        name: fbtSystemsByKey[SlimeVRSystemKey].name,
        imageURL: "images/slimevr.jpg",
        howItWorks: (
            <>
                <img src="images/slimevr_skeleton.jpg" />
                <p>
                    SlimeVR is an IMU-based (internal measurement unit) system. It uses a gyroscope to measure the
                    rotation of each bone, and then reconstruct the skeleton.
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
            switch (fbtConfig) {
                case "lower_body_set_5_0":
                    c.required.push({
                        name: "Lower-Body Set v1.2 (5+0)",
                        count: 1,
                        each_price_cents: 21900,
                        link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"),
                    });
                    break;
                case "core_set_6_0":
                    c.required.push({
                        name: "Core Set v1.2 (6+0)",
                        count: 1,
                        each_price_cents: 25900,
                        link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"),
                    });
                    break;
                case "enhanced_core_set_6_2":
                    c.required.push({
                        name: "Enhanced Core Set v1.2 (6+2)",
                        count: 1,
                        each_price_cents: 32500,
                        link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker"),
                    });
                    break;
                case "full_body_set_8_2":
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
                each_price_cents: 1899,
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
            switch (fbtConfig) {
                case "lower_body_set_5_0":
                    return (
                        <>
                            <div>5 point tracking (Chest, 2x Thigh, 2x Ankle)</div>
                            <div>Feet are estimated based on ankles, and how close they are to the ground.</div>
                        </>
                    );
                case "core_set_6_0":
                    return (
                        <>
                            <div>6 point tracking (Chest, Hip, 2x Thigh, 2x Ankle)</div>
                            <div>Two trackers on the upper body provide more expressiveness.</div>
                            <div>Feet are estimated based on ankles, and how close they are to the ground.</div>
                        </>
                    );
                case "enhanced_core_set_6_2":
                    return (
                        <>
                            <div>8 point tracking (Chest, Hip, 2x Thigh, 2x Ankle, 2x Feet)</div>
                            <div>Two trackers on the upper body provide more expressiveness.</div>
                        </>
                    );
                case "full_body_set_8_2":
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
                <img src="images/slimevr_size.jpg" />
            </>
        ),
        examples: (function () {
            const vrHeadset = "meta_quest_3";
            const nodes: Record<string, React.ReactNode> = {};
            for (const v of ExampleVideoKeys) {
                nodes[v] = (
                    <VideoPlayer
                        key={v}
                        base_url={`examples/${vrHeadset}/${SlimeVRSystemKey}/${fbtConfig}/${vrHeadset}-${SlimeVRSystemKey}-${fbtConfig}-${v}-irl.mp4`}
                        overlay_url={`examples/${vrHeadset}/${SlimeVRSystemKey}/${fbtConfig}/${vrHeadset}-${SlimeVRSystemKey}-${fbtConfig}-${v}-vrc.mp4`}
                        base_thumbnail_url={`examples/${vrHeadset}/${SlimeVRSystemKey}/${fbtConfig}/${vrHeadset}-${SlimeVRSystemKey}-${fbtConfig}-${v}-irl.jpg`}
                        overlay_thumbnail_url={`examples/${vrHeadset}/${SlimeVRSystemKey}/${fbtConfig}/${vrHeadset}-${SlimeVRSystemKey}-${fbtConfig}-${v}-vrc.jpg`}
                        width={480}
                        height={640}
                    />
                );
            }

            return nodes;
        })(),
        drawbacks: (
            <>
                <div className="drawback">
                    <div className="sub-heading">Drift</div>
                    <img style={{width: "480px", height: "320px" }} />
                    <p>Over time, SlimeVR trackers will drift, because the IMU is not perfect. Your in-game avatar will gradually get out of sync with your real body.</p>
                    <p>Typical users notice drift after 30-45 minutes. When Stay Aligned is configured, some users who are just hanging out with friends have reported no drift for up to 5 hours.</p>
                    <p>To fix the drift, just face forward, and double tap your chest tracker.</p>
                </div>
                <div className="drawback">
                    <div className="sub-heading">Calibration</div>
                    <img style={{width: "480px", height: "320px" }} />
                    <p>At the start of each VR session, you will need to calibrate the trackers so that the skeleton will make your body in the real world. The calibration process can be a little tricky, and requires some adjustment for each person.</p>
                    <p>SlimeVR runs VRChat calibration sessions where you can get help with calibration.</p>
                </div>
            </>
        ),
    };
}
