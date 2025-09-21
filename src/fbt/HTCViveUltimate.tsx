import type * as FBT from "./FBT";

export const HTCViveUltimate: FBT.System = {
    "key": "htc_vive_ultimate",
    "name": "HTC VIVE Ultimate",
    "configs": {
        "3_trackers": "3 trackers (Chest, 2x Ankle)"
    },
    "itemList": config => {
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
                c.required.push({
                    name: "TrackStraps for VIVE Ultimate Tracker",
                    count: 1,
                    each_price_cents: 4999,
                    link: new URL("https://www.vive.com/us/accessory/trackstraps-for-vive-ultimate-tracker-plus-dance-dash/")
                });
                break;
        }
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
                        <div>3 point tracking (Chest, 2x Ankle)</div>
                        <div>Remaining body parts estimated with inverse kinematics (IK).</div>
                    </>
                );
        }
    },
    "battery_life": () => "Up to 7.5 hours",
    "weight": () => "96 g / 3.4 oz per tracker",
    "volume": () => "123 cm³ (77 x 58.6 x 27.3 mm)",
    "examples": () => ({}),
};
