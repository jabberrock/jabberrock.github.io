import type React from "react";
import type * as FBT from "./FBT";
import { VideoPlayer } from "./VideoPlayer";

export const SlimeVR: FBT.System = {
    "key": "slimevr",
    "name": "SlimeVR Trackers",
    "configs": {
        "5_trackers": "5 trackers (Chest, 2x Thigh, 2x Ankle)",
        "6_trackers": "6 trackers (Chest, Hip, 2x Thigh, 2x Ankle)",
        "8_trackers": "8 trackers (Chest, Hip, 2x Thigh, 2x Ankle, 2x Feet)"
    },
    "specialized": (config) => {
        return {
            "key": SlimeVR.key,
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
                    case "5_trackers":
                        c.required.push({
                            name: "Lower-Body Set v1.2 (5+0)",
                            count: 1,
                            each_price_cents: 21900,
                            link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker")
                        })
                        break;
                    case "6_trackers":
                        c.required.push({
                            name: "Core Set v1.2 (6+0)",
                            count: 1,
                            each_price_cents: 25900,
                            link: new URL("https://www.crowdsupply.com/slimevr/slimevr-full-body-tracker")
                        })
                        break;
                    case "8_trackers":
                        c.required.push({
                            name: "Enhanced Core Set v1.2 (6+2)",
                            count: 1,
                            each_price_cents: 32500,
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
                const videos = [
                    "1_standing",
                    "2_light_dancing",
                    "3_dynamic_movement",
                    "4_sitting",
                    "5_lying_down",
                    "6_sitting_on_floor",
                    "7_light_exercise",
                ];

                const nodes: Record<string, React.ReactNode> = {};
                for (const v of videos) {
                    nodes[v] = (
                        <VideoPlayer
                            key={v}
                            base_url={`videos/slimevr_1_2/irl/irl_${v}.mp4`}
                            overlay_url={`videos/slimevr_1_2/vrc/vrc_${v}.mp4`}
                            thumbnail_url="videos/loading.png"
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
