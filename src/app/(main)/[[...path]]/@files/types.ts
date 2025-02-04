import { SortDescriptor } from "@react-types/shared";

export type FileDescriptor = {
  key: string;
  fullPath: string;
  name: string;
  kind: "file" | "directory";
  url: `/${string}`;
  size?: number;
};

export type Action =
  | {
      type: "sort";
      sorting: SortDescriptor;
    }
  | {
      type: "delete";
      files: FileDescriptor[];
      sorting?: SortDescriptor;
    }
  | {
      type: "move";
      source: FileDescriptor[];
      target: FileDescriptor;
      sorting?: SortDescriptor;
    }
  | {
      type: "duplicate";
      files: FileDescriptor[];
      sorting?: SortDescriptor;
    };
