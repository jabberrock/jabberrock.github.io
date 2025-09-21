import type * as FBT from "./FBT";
import { VideoPlayer } from "./VideoPlayer";

export const HTCVive30: FBT.System = {
    "key": "htc_vive_30",
    "name": "HTC VIVE 3.0",
    "configs": {
        "3_trackers": "3 trackers (Chest, 2x Feet)"
    },
    "specialized": (config, questionnaireResult) => {
        return {
            "key": HTCVive30.key,
            "name": HTCVive30.name,
            "config": config,
            "configs": HTCVive30.configs,
            "imageURL": "images/htc_vive_3_0.jpg",
            "howItWorks": (
                <>
                    <img src="images/lighthouse_based_systems.jpg" />
                    <p>HTC VIVE 3.0 is a Lighthouse based system. The base stations send out pulses of infrared light, and each tracker detects when the light arrives. By comparing the timings, the tracker can figure out its position and the rotation.</p>
                    <p>With 3 trackers, only the position and rotation of the hip and feet are known. The position of other part of the body (e.g. chest, knees and ankles) are estimated using IK (inverse kinematics).</p>
                </>
            ),
            "itemList": (function() {
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
                            each_price_cents: questionnaireResult.ownsLighthouse ? 0 : 10099,
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
            })(),
            "availability": (
                <>
                    <p>HTC VIVE<br /><a href="https://vive.com/" target="_blank">vive.com</a></p>
                    <p>Available immediately</p>
                </>
            ),
            "tracking": (function() {
                switch (config) {
                    case "3_trackers":
                        return (
                            <>
                                <div>3 point tracking (Chest, 2x Feet)</div>
                                <div>Remaining body parts estimated with inverse kinematics (IK).</div>
                            </>
                        );
                }
            })(),
            "specs": (
                <>
                    <div>Up to 7.5 hours</div>
                    <div>75 g / 2.6 oz per tracker</div>
                    <div>247 cm³ (70.9 × 79.0 × 44.1 mm)</div>
                    <img src="images/htc_vive_3_0_size.jpg" />
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
                            base_url={`videos/htc_vive_3_0/irl/irl_${v}.mp4`}
                            overlay_url={`videos/htc_vive_3_0/vrc/vrc_${v}.mp4`}
                            thumbnail_url="videos/loading.png"
                            width={480}
                            height={640}
                        />
                    );
                }

                return nodes;
            })(),
        };
    }
};
