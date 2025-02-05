import { SortDescriptor } from "@react-types/shared";
import { Encoded } from "@/app/(main)/[[...path]]/types";

export type FileDescriptor = {
  key: string;
  fullPath: string;
  name: string;
  kind: "file" | "directory";
  url: `/${string}` & Encoded;
  created: Date;
  modified: Date;
  size?: number;
};

export type FilesState = {
  sorting?: SortDescriptor;
};

export type FilesActionPayload = FilesState &
  (
    | { type: "refresh" }
    | { type: "sort"; sorting: SortDescriptor }
    | { type: "delete"; files: FileDescriptor[] }
    | { type: "move"; source: string[]; target?: FileDescriptor }
    | { type: "duplicate"; files: FileDescriptor[] }
  );

export type FilesAction<R = Promise<FileDescriptor[]>> = (
  payload: FilesActionPayload,
) => R;
