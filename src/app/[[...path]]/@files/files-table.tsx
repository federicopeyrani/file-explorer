"use client";

import {
  ActionMenu,
  Cell,
  Column,
  Item,
  Row,
  Selection,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";
import { FileDescriptor } from "@/app/[[...path]]/@files/types";
import { formatSize } from "@/app/[[...path]]/utils";
import { Icon } from "@/components";
import { useDragAndDropMove } from "@/app/[[...path]]/@files/use-drag-and-drop-move";

export const FilesTable = ({
  files,
  onDeleteAction,
  selectedKeys,
  onMoveAction,
  onSelectionChange,
}: {
  files: FileDescriptor[];
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  onMoveAction?: (source: FileDescriptor[], target: FileDescriptor) => void;
  onDeleteAction?: (file: FileDescriptor) => void;
}) => {
  const { dragAndDropHooks } = useDragAndDropMove({
    files,
    onMove: onMoveAction,
  });

  return (
    <TableView
      height="80%"
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      selectionMode="multiple"
      selectionStyle="highlight"
      dragAndDropHooks={dragAndDropHooks}
    >
      <TableHeader>
        <Column align="center" hideHeader>
          Icon
        </Column>
        <Column allowsSorting>Name</Column>
        <Column allowsSorting>Size</Column>
        <Column align="end" hideHeader>
          Actions
        </Column>
      </TableHeader>
      <TableBody items={files}>
        {(file) => (
          <Row href={file.url}>
            <Cell>
              <Icon>{file.isDirectory ? "folder" : "description"}</Icon>
            </Cell>

            <Cell>{file.name}</Cell>

            <Cell>{file.size !== undefined && formatSize(file.size)}</Cell>

            <Cell>
              <ActionMenu
                isQuiet
                onAction={(key) => {
                  if (key === "delete") {
                    onDeleteAction?.(file);
                  }
                }}
                disabledKeys={
                  file.isDirectory || onDeleteAction === undefined
                    ? ["delete"]
                    : []
                }
              >
                <Item key="delete">Delete</Item>
              </ActionMenu>
            </Cell>
          </Row>
        )}
      </TableBody>
    </TableView>
  );
};
