import { FilesViewSettings } from "@/app/(main)/files-view-settings-provider";
import { Switch } from "@adobe/react-spectrum";

export const FilesViewModeSelector = ({
  value,
  onChange,
}: {
  value: FilesViewSettings["mode"];
  onChange: (mode: FilesViewSettings["mode"]) => void;
}) => (
  <Switch
    isSelected={value === "list"}
    onChange={(isSelected) => onChange(isSelected ? "list" : "table")}
  >
    List
  </Switch>
);
