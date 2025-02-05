import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableView,
  useDateFormatter,
} from "@adobe/react-spectrum";
import {
  FileDescriptor,
  FilesAction,
} from "@/app/(main)/[[...path]]/@files/types";
import { formatSize } from "@/app/(main)/[[...path]]/utils";
import { useDragAndDropMove } from "@/app/(main)/[[...path]]/@files/use-drag-and-drop-move";
import { MultipleSelection, Sortable } from "@react-types/shared";
import { FileActionMenu } from "@/app/(main)/[[...path]]/@files/file-action-menu";
import { useFilesViewSettings } from "@/app/(main)/files-view-settings-provider";
import { FileIcon } from "@/app/(main)/[[...path]]/@files/file-icon";

export const FilesTable = ({
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
    <TableView
      density={density}
      isQuiet
      dragAndDropHooks={dragAndDropHooks}
      {...props}
    >
      <TableHeader>
        <Column align="center" hideHeader>
          Icon
        </Column>
        <Column key="name" allowsSorting width="1fr">
          Name
        </Column>
        <Column key="modified" allowsSorting width="0.25fr" minWidth={128}>
          Modified
        </Column>
        <Column key="size" allowsSorting width="0.25fr" minWidth={128}>
          Size
        </Column>
        <Column align="end" hideHeader>
          Actions
        </Column>
      </TableHeader>
      <TableBody items={files}>
        {(file) => (
          <Row textValue={file.name} href={file.url}>
            <Cell>
              <FileIcon kind={file.kind} name={file.name} />
            </Cell>

            <Cell>{file.name}</Cell>

            <Cell>{formatter.format(file.modified)}</Cell>

            <Cell>{file.size !== undefined && formatSize(file.size)}</Cell>

            <Cell>
              {action && <FileActionMenu file={file} action={action} />}
            </Cell>
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};
