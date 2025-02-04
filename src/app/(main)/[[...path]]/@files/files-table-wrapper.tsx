"use client";

import { ActionBarContainer, Selection } from "@adobe/react-spectrum";
import { FilesTable } from "@/app/(main)/[[...path]]/@files/files-table";
import { startTransition, useActionState, useState } from "react";
import { FilesActionBar } from "@/app/(main)/[[...path]]/@files/files-action-bar";
import { SortDescriptor } from "@react-types/shared";
import { Action, FileDescriptor } from "@/app/(main)/[[...path]]/@files/types";

export const FilesTableWrapper = ({
  files,
  action,
}: {
  files: FileDescriptor[];
  action: (payload: Action) => Promise<FileDescriptor[]>;
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sorting, setSorting] = useState<SortDescriptor>();

  const [state, dispatch] = useActionState(
    (_: FileDescriptor[], payload: Action) => action({ sorting, ...payload }),
    files,
  );

  return (
    <ActionBarContainer height="100%">
      <FilesTable
        files={state}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        action={(payload) => startTransition(() => dispatch(payload))}
        sorting={sorting}
        onSortingChange={(descriptor) =>
          startTransition(() => {
            setSorting(descriptor);
            dispatch({ type: "sort", sorting: descriptor });
          })
        }
      />

      <FilesActionBar
        selectedKeys={selectedKeys}
        files={state}
        action={(payload) => startTransition(() => dispatch(payload))}
        selectedItemCount={selectedKeys === "all" ? "all" : selectedKeys.size}
        onClearSelection={() => setSelectedKeys(new Set())}
      />
    </ActionBarContainer>
  );
};
