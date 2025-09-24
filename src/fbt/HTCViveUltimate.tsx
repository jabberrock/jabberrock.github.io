import type * as FBT from "./FBT";
import { ExampleVideoKeys } from "./FBT";
import { VideoPlayer } from "./VideoPlayer";

export const HTCViveUltimate: FBT.System = {
    "key": "htc_vive_ultimate",
    "name": "HTC VIVE Ultimate",
    "configs": {
        "3_trackers": "3 trackers (Chest, 2x Ankle)"
    },
    "specialized": (config, questionnaireResult) => {
        if (questionnaireResult.standalone === "standalone") {
            return {
                "key": HTCViveUltimate.key,
                "name": HTCViveUltimate.name,
                "config": config,
                "configs": HTCViveUltimate.configs,
                "imageURL": "images/htc_vive_ultimate.jpg",
                "howItWorks": <p className="warning">HTC VIVE Ultimate trackers require a PC</p>,
                "itemList": {required: [], optional: []},
                "availability": <p>N/A</p>,
                "tracking": <p>N/A</p>,
                "specs": <p>N/A</p>,
                "examples": {},
            };
        }

        return {
            "key": `${HTCViveUltimate.key}-${config}`,
            "name": HTCViveUltimate.name,
            "config": config,
            "configs": HTCViveUltimate.configs,
            "imageURL": "images/htc_vive_ultimate.jpg",
            "howItWorks": (
                <>
                    <img src="images/htc_vive_ultimate_cameras.jpg" />
                    <p>HTC VIVE Ultimate is an inside-out system. Each tracker has 2 cameras which use a SLAM algorithm (Simultaneous Localization and Motion) to keep track where it is in your playspace.</p>
                    <p>With 3 trackers, only the position and rotation of the hip and ankles are known. The position of other part of the body (e.g. chest, knees and feet) are estimated using IK (inverse kinematics).</p>
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
                            name: "VIVE Ultimate Tracker 3+1 Kit",
                            count: 1,
                            each_price_cents: 55999,
                            link: new URL("https://www.vive.com/us/accessory/vive-ultimate-tracker/")
                        });
                        break;
                }
                c.required.push({
                    name: "TrackStraps",
                    comment: "to fix trackers on body",
                    count: 1,
                    each_price_cents: 4999,
                    link: new URL("https://www.vive.com/us/accessory/trackstraps-for-vive-ultimate-tracker-plus-dance-dash/")
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
                                <div>3 point tracking (Chest, 2x Ankle)</div>
                                <div>Knees and feet are estimated with inverse kinematics (IK).</div>
                            </>
                        );
                }
            })(),
            "specs": (
                <>
                    <div>Up to 7.5 hours</div>
                    <div>96 g / 3.4 oz per tracker</div>
                    <div>123 cm³ (77 x 58.6 x 27.3 mm)</div>
                </>
            ),
            "examples": (function() {
                const vrHeadset = "meta_quest_3";
                const nodes: Record<string, React.ReactNode> = {};
                for (const v of ExampleVideoKeys) {
                    nodes[v] = (
                        <VideoPlayer
                            key={v}
                            base_url={`examples/${vrHeadset}/${HTCViveUltimate.key}/${config}/${vrHeadset}-${HTCViveUltimate.key}-${config}-${v}-irl.mp4`}
                            overlay_url={`examples/${vrHeadset}/${HTCViveUltimate.key}/${config}/${vrHeadset}-${HTCViveUltimate.key}-${config}-${v}-vrc.mp4`}
                            base_thumbnail_url={`examples/${vrHeadset}/${HTCViveUltimate.key}/${config}/${vrHeadset}-${HTCViveUltimate.key}-${config}-${v}-irl.jpg`}
                            overlay_thumbnail_url={`examples/${vrHeadset}/${HTCViveUltimate.key}/${config}/${vrHeadset}-${HTCViveUltimate.key}-${config}-${v}-vrc.jpg`}
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
