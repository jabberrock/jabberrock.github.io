import type React from "react";
import Select from "react-select";
import { fbtSystems, type FBTSystemKey } from "../fbt/FBT";

type FBTSystemConfig = {
    systemKey: FBTSystemKey;
    configKey: string;
};

type FBTSystemGroup = {
    label: string;
    options: FBTSystemConfigOption[];
};

export type FBTSystemConfigOption = {
    label: string;
    value: FBTSystemConfig;
};

const groupedOptions: FBTSystemGroup[] = fbtSystems.map((system) => ({
    label: system.name,
    options: system.configurations.map((config) => ({
        label: config.name,
        value: {
            systemKey: system.key,
            configKey: config.key,
        },
    })),
}));

const options: FBTSystemConfigOption[] = groupedOptions.flatMap((system) => system.options);

export function findFBTSystemOption(systemKey: FBTSystemKey, configKey: string) {
    const option = options.find((o) => o.value.systemKey === systemKey && o.value.configKey === configKey);
    if (!option) {
        throw "Unknown option";
    }

    return option;
}

type FBTSystemSelectProps = {
    selected: FBTSystemConfigOption | null;
    onChange: (newValue: FBTSystemConfigOption | null) => any;
};

export const FBTSystemSelect: React.FC<FBTSystemSelectProps> = ({ selected, onChange }) => {
    return (
        <Select<FBTSystemConfigOption, false, FBTSystemGroup>
            placeholder="Select a full-body tracking system..."
            value={selected}
            options={groupedOptions}
            onChange={(v) => onChange(v)}
        />
    );
};
