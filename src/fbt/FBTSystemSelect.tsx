import type React from "react";
import Select from "react-select";
import { FBTSystemKeys, type FBTSystemKey } from "./FBT";

type FBTSystemConfig = {
    systemKey: FBTSystemKey
    configKey: string
};

const FBTSystemName: Record<FBTSystemKey, string> = {
    "slimevr_1_2": "SlimeVR v1.2",
    "htc_vive_3_0": "HTC VIVE 3.0",
    "htc_vive_ultimate": "HTC VIVE Ultimate" 
};

const FBTSystemConfigName: Record<FBTSystemKey, Record<string, string>> = {
    slimevr_1_2: {
        "lower_body_set_5_0": "SlimeVR Lower-Body Set (5 main trackers)",
        "core_set_6_0": "SlimeVR Core Set (6 main trackers)",
        "enhanced_core_set_6_2": "SlimeVR Enhanced Core Set (6 main trackers + 2 extension trackers)",
        "full_body_set_8_2": "SlimeVR Full Body Set (8 main trackers + 2 extension trackers)",
    },
    htc_vive_3_0: {
        "3_trackers": "3x HTC VIVE 3.0 trackers",
        "4_trackers": "3x HTC VIVE 3.0 trackers + 1x for continuous calibration",
    },
    htc_vive_ultimate: {
        "3_trackers": "3x HTC VIVE Ultimate trackers",
    }
};

type FBTSystemGroup = {
    label: string
    options: FBTSystemConfigOption[]
};

export type FBTSystemConfigOption = {
    label: string
    value: FBTSystemConfig
};

export const fbtSystemConfigOptions: FBTSystemGroup[] = FBTSystemKeys.map(systemKey => ({
    label: FBTSystemName[systemKey],
    options: Object.keys(FBTSystemConfigName[systemKey]).map(configKey => (
        {
            label: FBTSystemConfigName[systemKey][configKey],
            value: {
                systemKey,
                configKey
            }
        }
    ))
}));

type FBTSystemSelectProps = {
    selected: FBTSystemConfigOption | null,
    onChange: (newValue: FBTSystemConfigOption | null) => any
};

function gray(amount: number) {
    return `rgb(${amount * 256}, ${amount * 256}, ${amount * 256})`;
}

export const FBTSystemSelect: React.FC<FBTSystemSelectProps> = ({
    selected,
    onChange
}) => {
    return (
        <Select<FBTSystemConfigOption, false, FBTSystemGroup>
            value={selected}
            options={fbtSystemConfigOptions}
            onChange={v => onChange(v)}
            theme={theme => ({
                ...theme,
                colors: {
                    ...theme.colors,
                    primary25: theme.colors.primary75,
                    primary75: theme.colors.primary25,
                    neutral0: gray(0),
                    neutral5: gray(0.05),
                    neutral10: gray(0.10),
                    neutral20: gray(0.20),
                    neutral30: gray(0.30),
                    neutral40: gray(0.40),
                    neutral50: gray(0.50),
                    neutral60: gray(0.60),
                    neutral70: gray(0.70),
                    neutral80: gray(0.80),
                    neutral90: gray(0.90),
                },
            })}
        />
    );
};
