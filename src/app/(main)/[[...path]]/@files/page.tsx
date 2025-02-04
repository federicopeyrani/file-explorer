import { rename } from "node:fs/promises";
import { Action, FileDescriptor } from "@/app/(main)/[[...path]]/@files/types";
import { PathParams } from "@/app/(main)/[[...path]]/types";
import { emptyPath, uriPathToFileURL } from "@/app/(main)/[[...path]]/utils";
import path from "node:path";
import { base } from "@/config";
import { FilesTableWrapper } from "@/app/(main)/[[...path]]/@files/files-table-wrapper";
import {
  getFiles,
  sortFiles,
} from "@/app/(main)/[[...path]]/@files/utils.server";

export default async function Page({ params }: PathParams) {
  const { path: uriPath } = await params;
  const fileURL = uriPathToFileURL(base, uriPath);

  const file = Bun.file(fileURL);
  const stats = await file.stat();

  if (!stats.isDirectory()) {
    return <div>This is a file.</div>;
  }

  const files = await getFiles(uriPath ?? emptyPath);
  console.log("render", fileURL.pathname, files.length);

  const action = async (payload: Action): Promise<FileDescriptor[]> => {
    "use server";

    console.log("action", payload.type);

    switch (payload.type) {
      case "sort":
        return sortFiles(files, payload.sorting);
      case "delete":
        for (const file of payload.files) {
          await Bun.file(file.fullPath).delete();
        }
        return getFiles(uriPath ?? emptyPath, payload.sorting);
      case "move":
        for (const file of payload.source) {
          const name = path.basename(file.fullPath);
          const newPath = path.join(payload.target.fullPath, name);
          await rename(file.fullPath, newPath);
        }
        return getFiles(uriPath ?? emptyPath, payload.sorting);
    }

    return files;
  };

  return <FilesTableWrapper files={files} action={action} />;
}
