import {
  FilesAction,
  FileDescriptor,
} from "@/app/(main)/[[...path]]/@files/types";
import { ActionBar, Item, Selection } from "@adobe/react-spectrum";
import { Icon } from "@/components";
import { ActionBarProps } from "@react-types/actionbar";

export const FilesActionBar = ({
  selectedKeys,
  files,
  action,
  ...props
}: {
  selectedKeys: Selection;
  files: FileDescriptor[];
  action: (payload: FilesAction) => void;
} & Omit<ActionBarProps<object>, "children">) => (
  <ActionBar
    isEmphasized
    onAction={async (key) => {
      const selectedFiles =
        selectedKeys === "all"
          ? files
          : files.filter((file) => selectedKeys.has(file.key));

      switch (key) {
        case "duplicate":
          action({ type: "duplicate", files: selectedFiles });
          return;
        case "delete":
          action({ type: "delete", files: selectedFiles });
          return;
      }
    }}
    {...props}
  >
    <Item key="delete">
      <Icon>delete</Icon>
    </Item>
  </ActionBar>
);
