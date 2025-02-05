import { FilesViewSettings } from "@/app/(main)/files-view-settings-provider";
import { ActionButton, Item, Menu, MenuTrigger } from "@adobe/react-spectrum";
import { Icon } from "@/components";
import { withSingleSelection } from "@/utils";

export const FilesViewDensitySelector = ({
  value,
  onChange,
}: {
  value: FilesViewSettings["density"];
  onChange: (mode: FilesViewSettings["density"]) => void;
}) => (
  <MenuTrigger>
    <ActionButton>
      <Icon>
        {value === "compact"
          ? "density_small"
          : value === "regular"
            ? "density_medium"
            : "density_large"}
      </Icon>
    </ActionButton>

    <Menu
      selectionMode="single"
      selectedKeys={[value]}
      onSelectionChange={withSingleSelection(onChange)}
    >
      <Item key="compact">Compact</Item>
      <Item key="regular">Regular</Item>
      <Item key="spacious">Comfortable</Item>
    </Menu>
  </MenuTrigger>
);
