import type * as FBT from "./FBT";
import { VideoPlayer } from "./VideoPlayer";

export const HTCVive30: FBT.System = {
    "key": "htc_vive_30",
    "name": "HTC VIVE 3.0",
    "configs": {
        "3_trackers": "3 trackers (Chest, 2x Feet)"
    },
    "itemList": config => {
        const c: FBT.ItemList = {
            required: [],
            optional: [],
        };
        switch (config) {
            case "3_trackers":
                c.required.push({
                    name: "VIVE 3.0 Tracker",
                    count: 3,
                    each_price_cents: 14900,
                    link: new URL("https://www.vive.com/us/accessory/tracker3/")
                });
                c.required.push({
                    name: "TrackStraps for VIVE Ultimate Tracker",
                    count: 1,
                    each_price_cents: 4999,
                    link: new URL("https://www.vive.com/us/accessory/trackstraps-for-vive-ultimate-tracker-plus-dance-dash/")
                });
                c.required.push({
                    name: "HTC VIVE SteamVR Base Station 1.0",
                    count: 2,
                    each_price_cents: 10099,
                    link: new URL("https://www.amazon.com/HTC-Vive-Base-Station-pc/dp/B01M01B92P")
                });
                break;
        }
        c.optional.push({
            name: "Skywin VR Tripod Stand",
            count: 1,
            each_price_cents: 4699,
            link: new URL("https://www.amazon.com/Skywin-Compatible-Station-Sensors-Constellation-PC/dp/B07B6FDKZ8")
        });
        return c;
    },
    "availability": () => (
        <>
            <div><a href="https://vive.com/" target="_blank">vive.com</a></div>
            <div>Available immediately</div>
        </>
    ),
    "tracking": config => {
        switch (config) {
            case "3_trackers":
                return (
                    <>
                        <div>3 point tracking (Chest, 2x Feet)</div>
                        <div>Remaining body parts estimated with inverse kinematics (IK).</div>
                    </>
                );
        }
    },
    "battery_life": () => "Up to 7.5 hours",
    "weight": () => "75 g / 2.6 oz per tracker",
    "volume": () => "247 cm³ (70.9 × 79.0 × 44.1 mm)",
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
                            base_url={`videos/htc_vive_3_0/irl/irl_${v.suffix}.mp4`}
                            overlay_url={`videos/htc_vive_3_0/vrc/vrc_${v.suffix}.mp4`}
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
