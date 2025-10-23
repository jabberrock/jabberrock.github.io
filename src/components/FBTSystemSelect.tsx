import type React from "react";
import Select from "react-select";
import { fbtSystemConfigs, fbtSystems, type FBTSystemConfigKey } from "../fbt/FBT";

type FBTSystemGroup = {
    label: string;
    options: FBTSystemConfigOption[];
};

export type FBTSystemConfigOption = {
    label: string;
    value: FBTSystemConfigKey;
};

const groupedOptions: FBTSystemGroup[] = fbtSystems.map((system) => ({
    label: system.name,
    options: fbtSystemConfigs
        .filter((config) => config.fbtSystemKey === system.key)
        .map((config) => ({
            label: config.name,
            value: config.key,
        })),
}));

const options: FBTSystemConfigOption[] = groupedOptions.flatMap((system) => system.options);

export function findFBTSystemOption(configKey: FBTSystemConfigKey) {
    const option = options.find((o) => o.value === configKey);
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
