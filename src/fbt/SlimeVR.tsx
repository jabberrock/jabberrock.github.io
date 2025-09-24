import type React from "react";
import { ExampleVideoKeys } from "./FBT";
import type * as FBT from "./FBT";
import { VideoPlayer } from "./VideoPlayer";

export const SlimeVR: FBT.System = {
    "key": "slimevr_1_2",
    "name": "SlimeVR Trackers",
    "configs": {
        "lower_body_set": "Lower-Body Set (5 trackers)",
        "core_set_6_0": "Core Set (6 trackers)",
        "enhanced_core_set_6_2": "Enhanced Core Set (6+2 trackers)"
    },
    "specialized": (config) => {
        return {
            "key": `${SlimeVR.key}-${config}`,
            "name": SlimeVR.name,
            "config": config,
            "configs": SlimeVR.configs,
            "imageURL": "images/slimevr.jpg",
            "howItWorks": (
                <>
                    <img src="images/slimevr_skeleton.jpg" />
                    <p>SlimeVR is an IMU-based (internal measurement unit) system. It uses a gyroscope to measure the rotation of each bone, and then reconstruct the skeleton.</p>
                    <p>The Core Set contains 6 trackers for your chest, hip, thighs and ankles. Feet are estimated based on your ankles and how close they are to the ground.</p>
                </>
            ),
            "itemList": (function() {
                const c: FBT.ItemList = {
                    required: [],
                    optional: [],
                };
                switch (config) {
                    case "lower_body_set_5_0":
                        c.required.push({
                            name: "Lower-Body Set v1.2 (5+0)",
                            count: 1,
                            each_price_cents: 21900,
                            link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker")
                        })
                        break;
                    case "core_set_6_0":
                        c.required.push({
                            name: "Core Set v1.2 (6+0)",
                            count: 1,
                            each_price_cents: 25900,
                            link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker")
                        })
                        break;
                    case "enhanced_core_set_6_2":
                        c.required.push({
                            name: "Enhanced Core Set v1.2 (6+2)",
                            count: 1,
                            each_price_cents: 32500,
                            link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker")
                        })
                        break;
                    case "full_body_set_8_2":
                        c.required.push({
                            name: "Full Body Set v1.2 (8+2)",
                            count: 1,
                            each_price_cents: 41500,
                            link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker")
                        })
                        break;
                }
                c.optional.push({
                    name: "Amazon Basics Adjustable Chest Mount Harness for GoPro Camera",
                    count: 1,
                    each_price_cents: 1899,
                    link: new URL("https://www.amazon.com/AmazonBasics-Chest-Mount-Harness-cameras/dp/B01D3I8A7A")
                });
                c.optional.push({
                    name: "10-Port USB Charger",
                    count: 1,
                    each_price_cents: 1362,
                    link: new URL("https://www.amazon.com/Charging-Technology-Guaranteed-Family-Sized-Multiple/dp/B07XXDS86V")
                });
                return c;
            })(),
            "availability": (
                <>
                    <p>Official SlimeVR Trackers<br /><a href="https://slimevr.dev/" target="_blank">slimevr.dev</a></p>
                    <p>Pre-order now for the next shipment (estimated shipping to customers in Nov 2025)</p>
                    <hr />
                    <p>3rd-Party Slime Trackers<br /><a href="https://discord.com/channels/817184208525983775/1058335815614341240" target="_blank">#marketplace-forum</a></p>
                    <p>SlimeVR-managed marketplace for verified sellers. Delivery may be much faster. Prices vary.</p>
                    <p className="warning">3rd-party Slime Trackers from Amazon, Ebay, Etsy, AliExpress or VRChat ARE NOT RECOMMENDED. You will likely receive over-priced and low quality trackers, with poor customer support.</p>
                </>
            ),
            "tracking": (function() {
                switch (config) {
                    case "5_trackers":
                        return "5 point tracking (Chest, 2x Thigh, 2x Ankle)";
                    case "6_trackers":
                        return "6 point tracking (Chest, Hip, 2x Thigh, 2x Ankle)";
                    case "8_trackers":
                        return "8 point tracking (Chest, Hip, 2x Thigh, 2x Ankle, 2x Feet)";
                }
            })(),
            "specs": (
                <>
                    <div>Up to 12 hours</div>
                    <div>12 g / 0.4 oz per tracker</div>
                    <div>14 cm³ (62 x 32 x 7 mm)</div>
                    <img src="images/slimevr_size.jpg" />
                </>
            ),
            "examples": (function() {
                const vrHeadset = "meta_quest_3";
                const nodes: Record<string, React.ReactNode> = {};
                for (const v of ExampleVideoKeys) {
                    nodes[v] = (
                        <VideoPlayer
                            key={v}
                            base_url={`examples/${vrHeadset}/${SlimeVR.key}/${config}/${vrHeadset}-${SlimeVR.key}-${config}-${v}-irl.mp4`}
                            overlay_url={`examples/${vrHeadset}/${SlimeVR.key}/${config}/${vrHeadset}-${SlimeVR.key}-${config}-${v}-vrc.mp4`}
                            base_thumbnail_url={`examples/${vrHeadset}/${SlimeVR.key}/${config}/${vrHeadset}-${SlimeVR.key}-${config}-${v}-irl.jpg`}
                            overlay_thumbnail_url={`examples/${vrHeadset}/${SlimeVR.key}/${config}/${vrHeadset}-${SlimeVR.key}-${config}-${v}-vrc.jpg`}
                            width={480}
                            height={640}
                        />
                    );
                }

                return nodes;
            })(),
        }
    }
};
