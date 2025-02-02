import { readdir } from "node:fs/promises";
import { FilesTable } from "@/app/[...path]/@files/files-table";
import { FileDescriptor } from "@/app/[...path]/@files/types";
import { revalidatePath } from "next/cache";

export default async function Page({
  params,
}: {
  params: {
    path: string[];
  };
}) {
  const relPath = params.path.map(decodeURIComponent).join("/");
  const path = `/${relPath}`;

  const file = Bun.file(path);
  const stats = await file.stat();

  if (!stats.isDirectory()) {
    return (
      <div>
        <h1>{path}</h1>
        <p>This is a file.</p>
      </div>
    );
  }

  const node = await readdir(path);

  const files = (
    await Promise.all(
      node.map(async (name): Promise<FileDescriptor | undefined> => {
        const fullPath = `${path}/${name}`;
        try {
          const stats = await Bun.file(fullPath).stat();

          return {
            path: fullPath,
            name,
            isDirectory: stats.isDirectory(),
            size: stats.size,
          };
        } catch (e) {
          console.log(e);
        }

        return undefined;
      }),
    )
  ).filter((file): file is FileDescriptor => file !== undefined);

  const handleDelete = async (file: FileDescriptor) => {
    "use server";
    await Bun.file(file.path).delete();
    revalidatePath(path);
  };

  return <FilesTable files={files} onDeleteAction={handleDelete} />;
}
