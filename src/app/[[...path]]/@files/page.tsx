import { rename } from "node:fs/promises";
import { FileDescriptor, FilesArgs } from "@/app/[[...path]]/@files/types";
import { revalidatePath } from "next/cache";
import { PathParams } from "@/app/[[...path]]/types";
import {
  emptyPath,
  encodedToURL,
  uriPathToFileURL,
} from "@/app/[[...path]]/utils";
import path from "node:path";
import { base } from "@/config";
import { FilesTableWrapper } from "@/app/[[...path]]/@files/files-table-wrapper";
import { getFiles, sortFiles } from "@/app/[[...path]]/@files/utils.server";
import { SWRClientProvider } from "@/app/swr-client-provider";

export default async function Page({ params }: PathParams) {
  const { path: uriPath } = await params;
  const fileURL = uriPathToFileURL(base, uriPath);

  const file = Bun.file(fileURL);
  const stats = await file.stat();

  if (!stats.isDirectory()) {
    return <div>This is a file.</div>;
  }

  const files = await getFiles(uriPath ?? emptyPath);

  const refresh = async () => {
    "use server";
    revalidatePath(encodedToURL(...(uriPath ?? emptyPath)));
  };

  const handleSort = async ({
    sorting = { column: "name", direction: "ascending" },
  }: FilesArgs) => {
    "use server";
    return sortFiles(files, sorting);
  };

  const handleMove = async (
    source: FileDescriptor[],
    destination: FileDescriptor,
  ) => {
    "use server";
    for (const file of source) {
      const name = path.basename(file.fullPath);
      const newPath = path.join(destination.fullPath, name);
      await rename(file.fullPath, newPath);
    }
    await refresh();
  };

  const handleDelete = async (files: FileDescriptor[]) => {
    "use server";
    for (const file of files) {
      await Bun.file(file.fullPath).delete();
    }
    await refresh();
  };

  return (
    <SWRClientProvider
      fallback={[
        [
          {
            key: `files${encodedToURL(...(uriPath ?? emptyPath))}`,
          } satisfies FilesArgs,
          files,
        ],
      ]}
    >
      <FilesTableWrapper
        dataKey={`files${encodedToURL(...(uriPath ?? emptyPath))}`}
        onSortAction={handleSort}
        onMoveAction={handleMove}
        onDeleteAction={handleDelete}
      />
    </SWRClientProvider>
  );
}
