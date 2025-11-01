import { matchConfig, matchConfigOptional, nonNullArray, type ItemList, type VRFBTSystem } from "./VRFBTSystem";
import { fbtSystemConfigsByKey, fbtSystemsByKey, type FBTSystemConfigKey } from "../fbt/FBT";
import { vrHeadsetsByKey, type VRHeadsetKey } from "../vr/VR";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { VideoInView } from "../components/VideoInView";

export function makeSlimeVR(vrHeadsetKey: VRHeadsetKey, fbtConfigKey: FBTSystemConfigKey): VRFBTSystem {
    const fbtSystemConfig = fbtSystemConfigsByKey[fbtConfigKey];
    if (fbtSystemConfig.fbtSystemKey !== "slimevr_trackers") {
        throw "Invalid FBT system config";
    }

    return {
        key: fbtSystemConfig.key,
        name: fbtSystemsByKey[fbtSystemConfig.fbtSystemKey].name,
        recommendation: (function () {
            return (
                <>
                    {vrHeadsetsByKey[vrHeadsetKey].requiresPC ? (
                        <p className="recommended">SlimeVR Trackers are compatible with your headset.</p>
                    ) : (
                        <p>
                            <span className="recommended">
                                SlimeVR Trackers are compatible with your headset in both PCVR and standalone modes.
                            </span>{" "}
                            <span className="warning">
                                Setting up standalone mode requires a PC, Android device, or sideloading onto your
                                headset.
                            </span>
                        </p>
                    )}
                    {fbtSystemConfig.key === "slimevr_trackers-lower_body_set_5_0" && (
                        <p>We recommend the Core Set (6+0) for significantly more accurate tracking.</p>
                    )}
                </>
            );
        })(),
        videoWarning: vrHeadsetKey !== "meta_quest" && (
            <p>
                Videos were recorded with a Meta Quest 3. There should be no difference using your headset because
                SlimeVR works the same way with all headsets.
            </p>
        ),
        howItWorks: (
            <>
                <p>
                    <img src="/slimevr_trackers/slimevr_skeleton.jpg" />
                </p>
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
                updated: new Date("2025-11-01"),
            };
            switch (fbtSystemConfig.key) {
                case "slimevr_trackers-lower_body_set_5_0":
                    c.required.push({
                        name: "Lower-Body Set v1.2 (5+0)",
                        count: 1,
                        each_price_cents: 21900,
                        link: new URL("https://slimevr.dev/buy"),
                    });
                    break;
                case "slimevr_trackers-core_set_6_0":
                    c.required.push({
                        name: "Core Set v1.2 (6+0)",
                        count: 1,
                        each_price_cents: 25900,
                        link: new URL("https://slimevr.dev/buy"),
                    });
                    break;
                case "slimevr_trackers-enhanced_core_set_6_2":
                    c.required.push({
                        name: "Enhanced Core Set v1.2 (6+2)",
                        count: 1,
                        each_price_cents: 32500,
                        link: new URL("https://slimevr.dev/buy"),
                    });
                    break;
                case "slimevr_trackers-full_body_set_8_2":
                    c.required.push({
                        name: "Full Body Set v1.2 (8+2)",
                        count: 1,
                        each_price_cents: 41500,
                        link: new URL("https://slimevr.dev/buy"),
                    });
                    break;
            }
            c.optional.push({
                name: "GoPro Harness",
                comment: "for more stable chest tracker",
                count: 1,
                each_price_cents: 1899,
                link: new URL("https://amzn.to/48XmcoI"),
            });
            c.optional.push({
                name: "10-Port USB Charger",
                comment: "for easier charging",
                count: 1,
                each_price_cents: 1869,
                link: new URL("https://amzn.to/47FKYHF"),
            });
            return c;
        })(),
        availability: (
            <>
                <CollapsibleSection title="Official SlimeVR Trackers" className="availability">
                    <p>
                        <a
                            href="https://slimevr.dev/?utm_source=slimevr-or-vive&utm_medium=website&utm_campaign=default"
                            target="_blank"
                        >
                            slimevr.dev
                        </a>
                    </p>
                    <p>
                        Official SlimeVR trackers are sold through a pre-order system, and shipments are sent out every
                        3-4 months. The next major shipment (S15) is estimated to be early December 2025.
                    </p>
                </CollapsibleSection>
                <CollapsibleSection title="3rd Party Slime Trackers" className="availability">
                    <p>
                        <a href="https://discord.gg/SlimeVR" target="_blank">
                            SlimeVR Discord
                        </a>{" "}
                        channel{" "}
                        <a href="https://discord.com/channels/817184208525983775/1058335815614341240" target="_blank">
                            #marketplace-forum
                        </a>
                    </p>
                    <p>
                        SlimeVR-managed marketplace for sellers. Delivery may be faster. Prices vary. Sellers who
                        violate the terms are removed.
                    </p>
                    <p className="warning">
                        DO NOT DIRECTLY BUY trackers advertised on Amazon, Ebay, Etsy, AliExpress or VRChat. Many
                        trackers are over-priced, and use low quality components. Some sellers do not allow returns.
                    </p>
                </CollapsibleSection>
            </>
        ),
        introExample: (
            <VideoInView
                src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-dancing-sxs.mp4`}
                className="sxs"
            />
        ),
        examples: {
            standing: (
                <VideoInView
                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-standing-overlay.mp4`}
                    className="overlay"
                />
            ),
            sitting: (
                <VideoInView
                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-sitting-overlay.mp4`}
                    className="overlay"
                />
            ),
            sittingOnFloor: (
                <VideoInView
                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-sitting_on_floor-overlay.mp4`}
                    className="overlay"
                />
            ),
            lyingDown: (
                <>
                    <VideoInView
                        src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-lying_down-overlay.mp4`}
                        className="overlay"
                    />
                    <p>It's so comfy under the blanket.</p>
                </>
            ),
            dancing: (
                <>
                    <VideoInView
                        src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-dancing-overlay.mp4`}
                        className="overlay"
                    />
                    <p>Please forgive me, I can't dance for my life. Maybe I should've called this "Wiggling About".</p>
                </>
            ),
            exercise: (
                <VideoInView
                    src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-exercise-overlay.mp4`}
                    className="overlay"
                />
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
                        <p>
                            <img src={`/${fbtSystemConfig.fbtSystemKey}/slimevr.jpg`} />
                        </p>
                        <p>SlimeVR trackers are one of the most affordable systems today.</p>
                    </>
                ),
            },
            setup: {
                score: 3,
                content: (
                    <>
                        <p>
                            <img src="/slimevr_trackers/slimevr_server.png" />
                        </p>
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
                        <VideoInView
                            src={`/${fbtSystemConfig.fbtSystemKey}/enhanced_core_set_6_2/meta_quest_3/calibration.mp4`}
                            className="calibration"
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
                        <VideoInView
                            src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-exercise-sxs.mp4`}
                            className="sxs"
                        />
                        <p>
                            SlimeVR works in any position, whether you're standing, sitting, lying down, dancing or
                            exercising.
                        </p>
                        <VideoInView
                            src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/demo-blanket-sxs.mp4`}
                            className="sxs"
                        />
                        <p>Trackers even work when you're under a blanket.</p>
                        <p>
                            If you have calibrated well, tracking is pretty accurate. In VR, when I look down or look in
                            a mirror, my avatar looks exactly how I would expect it to look. Even if it's slightly off,
                            other people won't be able to tell. (You can see that tracking is not perfect in the
                            recordings because I've matched everything up as exactly as I could. In VR, it is not as
                            obvious.)
                        </p>
                        <p>
                            There is no noticeable lag, and trackers handle fast and extreme movements with no problems.
                        </p>
                        <p>
                            SlimeVR trackers will experience drift over time. On modern IMUs, it takes more than 45
                            minutes before it becomes noticeable to you. Just face forward and double tap your chest
                            tracker to reset the trackers.
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
                                <iframe
                                    src="https://www.youtube.com/embed/VhAQvW3eGtA"
                                    style={{ width: "100%", aspectRatio: "640/360", border: "none" }}
                                ></iframe>
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
                                <p>When you are walking, you may notice your legs move to the side.</p>
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
                        <p>
                            <img
                                src={`/${fbtSystemConfig.fbtSystemKey}/${fbtSystemConfig.shortKey}/meta_quest_3/wearing.jpg`}
                            />
                        </p>
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
                            confident that my avatar matches me. I never have to think about the system itself.
                        </p>
                        <p>
                            Once or twice a play session, I will need to fix drift, but it’s a simple double tap. It is
                            not a difficult or painful process at all.
                        </p>
                        <p>
                            The biggest drawback of SlimeVR is that you need patience at the start, to figure out how
                            calibration works best for your body. Once you figure it out, this no longer becomes a
                            problem.
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
