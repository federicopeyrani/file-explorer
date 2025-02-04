import { Action, FileDescriptor } from "@/app/(main)/[[...path]]/@files/types";
import { ActionMenu, Item } from "@adobe/react-spectrum";

export const FileActionMenu = ({
  file,
  action,
}: {
  file: FileDescriptor;
  action: (payload: Action) => void;
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
