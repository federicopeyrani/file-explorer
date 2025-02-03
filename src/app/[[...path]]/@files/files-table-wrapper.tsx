"use client";

import {
  ActionBar,
  ActionBarContainer,
  Item,
  Selection,
} from "@adobe/react-spectrum";
import { FilesTable } from "@/app/[[...path]]/@files/files-table";
import { ComponentProps, useState } from "react";
import { Icon } from "@/components";

export const FilesTableWrapper = ({
  ...props
}: ComponentProps<typeof FilesTable>) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  return (
    <ActionBarContainer height="100%">
      <FilesTable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        {...props}
      />

      <ActionBar
        isEmphasized
        selectedItemCount={selectedKeys === "all" ? "all" : selectedKeys.size}
        onAction={(key) => alert(`Performing ${key} action...`)}
        onClearSelection={() => setSelectedKeys(new Set())}
      >
        <Item key="delete">
          <Icon>delete</Icon>
        </Item>
      </ActionBar>
    </ActionBarContainer>
  );
};
