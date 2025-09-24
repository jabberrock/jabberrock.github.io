import type React from "react";
import Select from "react-select";
import { fbtSystems, type FBTSystemKey } from "../fbt/FBT";

type FBTSystemConfig = {
    systemKey: FBTSystemKey
    configKey: string
};

type FBTSystemGroup = {
    label: string
    options: FBTSystemConfigOption[]
};

export type FBTSystemConfigOption = {
    label: string
    value: FBTSystemConfig
};

export const fbtSystemConfigOptions: FBTSystemGroup[] = fbtSystems.map(system => ({
    label: system.name,
    options: system.configurations.map(config => (
        {
            label: config.name,
            value: {
                systemKey: system.key,
                configKey: config.key
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
