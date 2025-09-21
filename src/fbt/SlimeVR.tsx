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
    "itemList": config => {
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
    },
    "availability": () => (
        <ul>
            <li>
                <div>Official SlimeVR Trackers - <a href="https://slimevr.dev/" target="_blank">slimevr.dev</a></div>
                <div>May take up to 3 months</div>
            </li>
            <li>
                <div>3rd-Party Slime Trackers - <a href="https://discord.com/channels/817184208525983775/1058335815614341240" target="_blank">#marketplace-forum</a></div>
                <div>SlimeVR-managed marketplace for verified sellers. Delivery may be much faster. Prices vary.</div>
                <div className="warning">3rd-party Slime Trackers from Amazon, Ebay, Etsy, AliExpress or VRChat ARE NOT RECOMMENDED. You will likely receive over-priced and low quality trackers, with poor customer support.</div>
            </li>
        </ul>
    ),
    "tracking": config => {
        switch (config) {
            case "5_trackers":
                return "5 point tracking (Chest, 2x Thigh, 2x Ankle)";
            case "6_trackers":
                return "6 point tracking (Chest, Hip, 2x Thigh, 2x Ankle)";
            case "8_trackers":
                return "8 point tracking (Chest, Hip, 2x Thigh, 2x Ankle, 2x Feet)";
        }
    },
    "battery_life": () => "Up to 12 hours",
    "weight": () => "12 g / 0.4 oz per tracker",
    "volume": () => "14 cm³ (62 x 32 x 7 mm)",
    "examples": () => {
        const videos = [
            {
                name: "Standing",
                suffix: "1_standing",
            },
            {
                name: "Light dancing",
                suffix: "2_light_dancing",
            },
            {
                name: "Dynamic movement",
                suffix: "3_dynamic_movement",
            },
            {
                name: "Sitting",
                suffix: "4_sitting",
            },
            {
                name: "Lying down",
                suffix: "5_lying_down",
            },
            {
                name: "Sitting on floor",
                suffix: "6_sitting_on_floor",
            },
            {
                name: "Light exercise",
                suffix: "7_light_exercise",
            }
        ];

        return (
            <>
                {videos.map(v => (
                    <div key={v.suffix}>
                        <div>{v.name}</div>
                        <VideoPlayer
                            base_url={`videos/slimevr_1_2/irl/irl_${v.suffix}.mp4`}
                            overlay_url={`videos/slimevr_1_2/vrc/vrc_${v.suffix}.mp4`}
                            thumbnail_url="videos/loading.png"
                            width={480}
                            height={640}
                        />
                    </div>
                ))}
            </>
        );
    },
};
