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
import { FileDescriptor, FilesArgs } from "@/app/[[...path]]/@files/types";
import { formatSize } from "@/app/[[...path]]/utils";
import { Icon } from "@/components";
import { useDragAndDropMove } from "@/app/[[...path]]/@files/use-drag-and-drop-move";
import { SortDescriptor } from "@react-types/shared";
import { useState } from "react";
import useSWR from "swr";

export const FilesTable = ({
  dataKey,
  onDeleteAction,
  selectedKeys,
  onSortAction,
  onMoveAction,
  onSelectionChange,
}: {
  dataKey: FilesArgs["key"];
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  onSortAction: (args: FilesArgs) => Promise<FileDescriptor[]>;
  onMoveAction?: (source: FileDescriptor[], target: FileDescriptor) => void;
  onDeleteAction?: (file: FileDescriptor[]) => void;
}) => {
  const [sorting, setSorting] = useState<SortDescriptor>();

  const { data: files = [], isLoading } = useSWR(
    { key: dataKey, sorting } satisfies FilesArgs,
    onSortAction,
  );

  const { dragAndDropHooks } = useDragAndDropMove({
    files,
    onMove: onMoveAction,
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
      onSortChange={setSorting}
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
      <TableBody items={files} loadingState={isLoading ? "sorting" : "idle"}>
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
              <ActionMenu
                isQuiet
                onAction={(key) => {
                  if (key === "delete") {
                    onDeleteAction?.([file]);
                  }
                }}
                disabledKeys={
                  file.kind === "directory" || onDeleteAction === undefined
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
