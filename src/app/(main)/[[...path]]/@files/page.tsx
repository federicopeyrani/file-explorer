import { rename } from "node:fs/promises";
import {
  FilesAction,
  FileDescriptor,
} from "@/app/(main)/[[...path]]/@files/types";
import { PathParams } from "@/app/(main)/[[...path]]/types";
import {
  joinPathToString,
  uriPathToFileURL,
} from "@/app/(main)/[[...path]]/utils";
import { base } from "@/config";
import { FilesTableWrapper } from "@/app/(main)/[[...path]]/@files/files-table-wrapper";
import {
  getFiles,
  sortFiles,
} from "@/app/(main)/[[...path]]/@files/utils.server";

export default async function Page({ params }: PathParams) {
  const { path } = await params;
  const fileURL = uriPathToFileURL(base, path);

  const file = Bun.file(fileURL);
  const stats = await file.stat();

  if (!stats.isDirectory()) {
    return <div>This is a file.</div>;
  }

  const files = await getFiles(path);

  const action = async (payload: FilesAction): Promise<FileDescriptor[]> => {
    "use server";

    console.log("action", payload);

    switch (payload.type) {
      case "sort":
        return sortFiles(files, payload.sorting);

      case "delete":
        for (const file of payload.files) {
          await Bun.file(file.fullPath).delete();
        }
        break;

      case "move":
        if (payload.target.kind !== "directory") {
          throw new Error("Cannot move files to a non-directory.");
        }

        for (const file of payload.source) {
          const newPath = joinPathToString(payload.target.fullPath, file.name);
          await rename(file.fullPath, newPath);
        }
        break;
    }

    return getFiles(path, payload.sorting);
  };

  return <FilesTableWrapper files={files} action={action} />;
}
