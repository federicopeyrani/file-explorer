"use client";

import { ActionBarContainer, Selection } from "@adobe/react-spectrum";
import { FilesTable } from "@/app/(main)/[[...path]]/@files/files-table";
import { useActionState, useState } from "react";
import { FilesActionBar } from "@/app/(main)/[[...path]]/@files/files-action-bar";
import { SortDescriptor } from "@react-types/shared";
import {
  FileDescriptor,
  FilesAction,
} from "@/app/(main)/[[...path]]/@files/types";
import { withTransition } from "@/app/utils";

export const FilesTableWrapper = ({
  files,
  action,
}: {
  files: FileDescriptor[];
  action: (payload: FilesAction) => Promise<FileDescriptor[]>;
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sorting, setSorting] = useState<SortDescriptor>();

  const [state, dispatch] = useActionState(
    async (_: FileDescriptor[], payload: FilesAction) => {
      const newState = await action({ sorting, ...payload });

      setSelectedKeys((selectedKeys) => {
        if (selectedKeys === "all") {
          return "all";
        }

        return new Set(
          newState
            .filter((file) => selectedKeys.has(file.key))
            .map((file) => file.key),
        );
      });

      return newState;
    },
    files,
  );

  return (
    <ActionBarContainer height="100%">
      <FilesTable
        files={state}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        action={withTransition(dispatch)}
        sorting={sorting}
        onSortingChange={withTransition((descriptor) => {
          setSorting(descriptor);
          dispatch({ type: "sort", sorting: descriptor });
        })}
      />

      <FilesActionBar
        selectedKeys={selectedKeys}
        files={state}
        action={withTransition(dispatch)}
        selectedItemCount={selectedKeys === "all" ? "all" : selectedKeys.size}
        onClearSelection={() => setSelectedKeys(new Set())}
      />
    </ActionBarContainer>
  );
};
