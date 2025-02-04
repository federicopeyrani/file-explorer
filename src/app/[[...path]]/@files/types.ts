import { SortDescriptor } from "@react-types/shared";
import { KeyData } from "@/app/types";

export type FileDescriptor = {
  key: string;
  fullPath: string;
  name: string;
  kind: "file" | "directory";
  url: `/${string}`;
  size?: number;
};

export type FilesArgs = KeyData<`files/${string}`, FileDescriptor[]> & {
  sorting?: SortDescriptor;
};
