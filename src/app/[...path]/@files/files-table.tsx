"use client";

import {
  ActionMenu,
  Cell,
  Column,
  Item,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";
import { useMemo } from "react";
import { FileDescriptor } from "@/app/[...path]/@files/types";
import Link from "next/link";

const sizeFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  style: "unit",
  unit: "byte",
  unitDisplay: "narrow",
});

export const FilesTable = ({
  files,
  onDeleteAction,
}: {
  files: FileDescriptor[];
  onDeleteAction?: (file: FileDescriptor) => void;
}) => {
  const filesIterable = useMemo(
    () => files.map((file) => ({ key: file.name, ...file }) as const),
    [files],
  );

  return (
    <TableView height={"100%"} width={"100%"}>
      <TableHeader>
        <Column>Name</Column>
        <Column>Size</Column>
        <Column>Actions</Column>
      </TableHeader>
      <TableBody items={filesIterable}>
        {(file) => (
          <Row>
            <Cell>
              {file.isDirectory ? (
                <Link href={file.path}>{file.name}</Link>
              ) : (
                file.name
              )}
            </Cell>

            <Cell>
              {!file.isDirectory &&
                file.size !== undefined &&
                sizeFormatter.format(file.size)}
            </Cell>

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
