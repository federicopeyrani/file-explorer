"use client";

import {
  Cell,
  Column,
  Row,
  Selection,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";
import { Action, FileDescriptor } from "@/app/(main)/[[...path]]/@files/types";
import { formatSize } from "@/app/(main)/[[...path]]/utils";
import { Icon } from "@/components";
import { useDragAndDropMove } from "@/app/(main)/[[...path]]/@files/use-drag-and-drop-move";
import { SortDescriptor } from "@react-types/shared";
import { FileActionMenu } from "@/app/(main)/[[...path]]/@files/file-action-menu";

export const FilesTable = ({
  files,
  selectedKeys,
  onSelectionChange,
  sorting,
  onSortingChange,
  action,
}: {
  files: FileDescriptor[];
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  action: (payload: Action) => void;
  sorting?: SortDescriptor;
  onSortingChange?: (descriptor: SortDescriptor) => void;
}) => {
  const { dragAndDropHooks } = useDragAndDropMove({
    files,
    onMove: (payload) => action({ type: "move", sorting, ...payload }),
  });

  return (
    <TableView
      isQuiet
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      selectionMode="multiple"
      selectionStyle="highlight"
      dragAndDropHooks={dragAndDropHooks}
      sortDescriptor={sorting}
      onSortChange={onSortingChange}
    >
      <TableHeader>
        <Column align="center" hideHeader>
          Icon
        </Column>
        <Column key="name" allowsSorting>
          Name
        </Column>
        <Column key="size" allowsSorting>
          Size
        </Column>
        <Column align="end" hideHeader>
          Actions
        </Column>
      </TableHeader>
      <TableBody items={files}>
        {(file) => (
          <Row href={file.url}>
            <Cell>
              <Icon>
                {file.kind === "directory" ? "folder" : "description"}
              </Icon>
            </Cell>

            <Cell>{file.name}</Cell>

            <Cell>{file.size !== undefined && formatSize(file.size)}</Cell>

            <Cell>
              <FileActionMenu file={file} action={action} />
            </Cell>
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};
