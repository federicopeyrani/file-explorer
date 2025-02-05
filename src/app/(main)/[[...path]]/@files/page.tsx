import path from "node:path";
import { rename } from "node:fs/promises";
import { FilesAction } from "@/app/(main)/[[...path]]/@files/types";
import { PathParams } from "@/app/(main)/[[...path]]/types";
import {
  emptyPath,
  encodedToURL,
  joinPathToString,
  uriPathToFileURL,
} from "@/app/(main)/[[...path]]/utils";
import { base } from "@/config";
import {
  getFiles,
  sortFiles,
} from "@/app/(main)/[[...path]]/@files/utils.server";
import { revalidatePath } from "next/cache";
import { FilesView } from "@/app/(main)/[[...path]]/@files/files-view";

export default async function Page({ params }: PathParams) {
  const { path: paramsPath } = await params;
  const fileURL = uriPathToFileURL(base, paramsPath);

  const file = Bun.file(fileURL);
  const stats = await file.stat();

  if (!stats.isDirectory()) {
    return <div>This is a file.</div>;
  }

  const files = await getFiles(paramsPath);

  const action: FilesAction = async (payload) => {
    "use server";

    switch (payload.type) {
      case "sort":
        return sortFiles(files, payload.sorting);

      case "delete":
        for (const file of payload.files) {
          await Bun.file(file.fullPath).delete();
        }
        break;

      case "move":
        for (const filePath of payload.source) {
          const name = path.basename(filePath);
          const newPath = joinPathToString(
            payload.target?.fullPath ?? decodeURIComponent(fileURL.pathname),
            name,
          );
          await rename(filePath, newPath);
        }
        break;
    }

    revalidatePath(encodedToURL(...(paramsPath ?? emptyPath)));
    return getFiles(paramsPath, payload.sorting);
  };

  return <FilesView files={files} action={action} />;
}
