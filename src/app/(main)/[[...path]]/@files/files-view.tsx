"use client";

import { ComponentProps } from "react";
import { FilesViewWrapper } from "@/app/(main)/[[...path]]/@files/files-view-wrapper";
import { FilesList } from "@/app/(main)/[[...path]]/@files/files-list";
import { useFilesViewSettings } from "@/app/(main)/files-view-settings-provider";
import { FilesTable } from "@/app/(main)/[[...path]]/@files/files-table";

export const FilesView = (
  props: Omit<ComponentProps<typeof FilesViewWrapper>, "children">,
) => {
  const { mode } = useFilesViewSettings();

  return (
    <FilesViewWrapper {...props}>
      {(props) =>
        mode === "list" ? <FilesList {...props} /> : <FilesTable {...props} />
      }
    </FilesViewWrapper>
  );
};
