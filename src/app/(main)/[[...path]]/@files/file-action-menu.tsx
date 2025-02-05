import {
  FileDescriptor,
  FilesAction,
} from "@/app/(main)/[[...path]]/@files/types";
import { ActionMenu, Item } from "@adobe/react-spectrum";

export const FileActionMenu = ({
  file,
  action,
}: {
  file: FileDescriptor;
  action: FilesAction<void>;
}) => {
  return (
    <ActionMenu
      isQuiet
      onAction={async (key) => {
        switch (key) {
          case "duplicate":
            action({ type: "duplicate", files: [file] });
            return;
          case "delete":
            action({ type: "delete", files: [file] });
            return;
        }
      }}
      disabledKeys={file.kind === "directory" ? ["delete"] : []}
    >
      <Item key="duplicate">Make a copy</Item>
      <Item key="delete">Delete</Item>
    </ActionMenu>
  );
};
