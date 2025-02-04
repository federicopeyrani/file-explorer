import { SortDescriptor } from "@react-types/shared";
import { Encoded } from "@/app/(main)/[[...path]]/types";

export type FileDescriptor = {
  key: string;
  fullPath: string;
  name: string;
  kind: "file" | "directory";
  url: `/${string}` & Encoded;
  size?: number;
};

export type FilesAction =
  | {
      type: "refresh";
      sorting?: SortDescriptor;
    }
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
      source: string[];
      target?: FileDescriptor;
      sorting?: SortDescriptor;
    }
  | {
      type: "duplicate";
      files: FileDescriptor[];
      sorting?: SortDescriptor;
    };
