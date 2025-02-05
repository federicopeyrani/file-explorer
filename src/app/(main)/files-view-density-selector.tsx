import { FilesViewSettings } from "@/app/(main)/files-view-settings-provider";
import { ActionButton } from "@adobe/react-spectrum";
import { Icon } from "@/components";

const options = {
  compact: "density_small",
  regular: "density_medium",
  spacious: "density_large",
} as const;

const keys = Object.keys(options) as (keyof typeof options)[];

export const FilesViewDensitySelector = ({
  value,
  onChange,
}: {
  value: FilesViewSettings["density"];
  onChange: (mode: FilesViewSettings["density"]) => void;
}) => (
  <ActionButton
    onPress={() => {
      const index = keys.indexOf(value);
      onChange(keys[(index + 1) % keys.length]);
    }}
  >
    <Icon>{options[value]}</Icon>
  </ActionButton>
);
