import { readdir } from "node:fs/promises";
import { FileDescriptor } from "@/app/[[...path]]/@files/types";
import {
  encode,
  encodedToURL,
  joinPathToString,
  uriPathToFileURL,
} from "@/app/[[...path]]/utils";
import { URIPath } from "@/app/[[...path]]/types";
import { SortDescriptor } from "@react-types/shared";
import { base } from "@/config";

export const getFiles = async (uriPath: URIPath) => {
  const url = uriPathToFileURL(base, uriPath);
  const node = await readdir(url);

  return (
    await Promise.all(
      node
        .map(async (name): Promise<FileDescriptor | undefined> => {
          const fullPath = joinPathToString(url.pathname, name);
          const stats = await Bun.file(fullPath).stat();
          const isDirectory = stats.isDirectory();

          return {
            key: fullPath,
            fullPath,
            name,
            kind: isDirectory ? "directory" : "file",
            url: encodedToURL(...uriPath, ...encode(name)),
            size: !isDirectory ? stats.size : undefined,
          };
        })
        .map((promise) => promise.catch(console.warn)),
    )
  ).filter((file): file is FileDescriptor => file !== undefined);
};

export const sortFiles = async (
  files: FileDescriptor[],
  descriptor: SortDescriptor,
) => {
  const sortField = descriptor.column as keyof FileDescriptor;
  return files.toSorted((a, b) => {
    if (a[sortField] === b[sortField]) {
      return 0;
    }

    if (a[sortField] === undefined) {
      return descriptor.direction === "ascending" ? 1 : -1;
    }

    if (b[sortField] === undefined) {
      return descriptor.direction === "ascending" ? -1 : 1;
    }

    const result = a[sortField] > b[sortField] ? 1 : -1;
    return descriptor.direction === "ascending" ? result : -result;
  });
};
