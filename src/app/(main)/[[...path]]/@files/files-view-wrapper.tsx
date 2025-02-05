import { ActionBarContainer, Selection } from "@adobe/react-spectrum";
import { ReactNode, useActionState, useState } from "react";
import { FilesActionBar } from "@/app/(main)/[[...path]]/@files/files-action-bar";
import {
  MultipleSelection,
  Sortable,
  SortDescriptor,
} from "@react-types/shared";
import {
  FileDescriptor,
  FilesAction,
  FilesActionPayload,
} from "@/app/(main)/[[...path]]/@files/types";
import { withTransition } from "@/app/utils";
import { SpectrumSelectionProps } from "@react-types/shared/src/selection";

export const FilesViewWrapper = ({
  children,
  files,
  action,
}: {
  children: (
    props: {
      files: FileDescriptor[];
      action: FilesAction<void>;
    } & MultipleSelection &
      SpectrumSelectionProps &
      Sortable,
  ) => ReactNode;
  files: FileDescriptor[];
  action: FilesAction;
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sorting, setSorting] = useState<SortDescriptor>();

  const [state, dispatch] = useActionState(
    async (_: FileDescriptor[], payload: FilesActionPayload) => {
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
      {children({
        files: state,
        action: withTransition(dispatch),
        selectedKeys,
        selectionMode: "multiple",
        selectionStyle: "highlight",
        onSelectionChange: setSelectedKeys,
        sortDescriptor: sorting,
        onSortChange: withTransition((descriptor) => {
          setSorting(descriptor);
          dispatch({ type: "sort", sorting: descriptor });
        }),
      })}

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
