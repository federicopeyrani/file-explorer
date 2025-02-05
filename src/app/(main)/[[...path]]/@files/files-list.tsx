import { Item, ListView, Text, useDateFormatter } from "@adobe/react-spectrum";
import {
  FileDescriptor,
  FilesAction,
} from "@/app/(main)/[[...path]]/@files/types";
import { useDragAndDropMove } from "@/app/(main)/[[...path]]/@files/use-drag-and-drop-move";
import { MultipleSelection, Sortable } from "@react-types/shared";
import { FileActionMenu } from "@/app/(main)/[[...path]]/@files/file-action-menu";
import { useFilesViewSettings } from "@/app/(main)/files-view-settings-provider";

export const FilesList = ({
  files,
  action,
  ...props
}: {
  files: FileDescriptor[];
  action?: FilesAction<void>;
} & MultipleSelection &
  Sortable) => {
  const { dragAndDropHooks } = useDragAndDropMove({ files, action });

  const formatter = useDateFormatter({
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const { density } = useFilesViewSettings();

  return (
    <ListView
      isQuiet
      density={density}
      items={files}
      dragAndDropHooks={dragAndDropHooks}
      {...props}
    >
      {(file) => (
        <Item
          textValue={file.name}
          href={file.url}
          hasChildItems={file.kind === "directory"}
        >
          <Text>{file.name}</Text>
          <Text slot="description">{formatter.format(file.modified)}</Text>
          {action && <FileActionMenu file={file} action={action} />}
        </Item>
      )}
    </ListView>
  );
};
