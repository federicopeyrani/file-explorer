import { readdir, rename } from "node:fs/promises";
import { FileDescriptor } from "@/app/[[...path]]/@files/types";
import { revalidatePath } from "next/cache";
import { PathParams } from "@/app/[[...path]]/types";
import { toURL, uriPathToFileURL } from "@/app/[[...path]]/utils";
import path from "node:path";
import { base } from "@/config";
import { FilesTableWrapper } from "@/app/[[...path]]/@files/files-table-wrapper";

export default async function Page({ params }: PathParams) {
  const { path: uriPath } = await params;
  const fileURL = uriPathToFileURL(base, uriPath);

  const file = Bun.file(fileURL);
  const stats = await file.stat();

  if (!stats.isDirectory()) {
    return <div>This is a file.</div>;
  }

  const node = await readdir(fileURL);

  const files = (
    await Promise.all(
      node.map(async (name): Promise<FileDescriptor | undefined> => {
        const fullPath = path.join(fileURL.pathname, name);
        const stats = await Bun.file(fullPath).stat();
        const isDirectory = stats.isDirectory();

        return {
          key: fullPath,
          fullPath,
          name,
          isDirectory,
          url: uriPath ? toURL([...uriPath, name]) : toURL([name]),
          size: !isDirectory ? stats.size : undefined,
        };
      }),
    )
  ).filter((file): file is FileDescriptor => file !== undefined);

  const refresh = async () => {
    "use server";
    revalidatePath(uriPath ? toURL(uriPath) : "/");
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

  const handleDelete = async (file: FileDescriptor) => {
    "use server";
    await Bun.file(file.fullPath).delete();
    await refresh();
  };

  return (
    <FilesTableWrapper
      files={files}
      onMoveAction={handleMove}
      onDeleteAction={handleDelete}
    />
  );
}
