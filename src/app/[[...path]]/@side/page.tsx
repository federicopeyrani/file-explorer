import { PathParams } from "@/app/[[...path]]/types";
import { statfs } from "node:fs/promises";
import { uriPathToFileURL } from "@/app/[[...path]]/utils";
import { SpaceMeter } from "@/app/[[...path]]/@side/space-meter";
import { QuickNav } from "@/app/[[...path]]/@side/quick-nav";
import { base, disksEntries, quickLinksEntries } from "@/config";

export default async function Page({ params }: PathParams) {
  const { path } = await params;
  const fileURL = uriPathToFileURL(base, path);
  const space = await statfs(fileURL);

  return (
    <div className="flex flex-col items-stretch gap-8 overflow-hidden">
      <QuickNav options={quickLinksEntries} />

      {disksEntries.map((disk) => (
        <SpaceMeter
          key={disk.value}
          label={disk.label}
          free={space.bsize * space.bavail}
          total={space.bsize * space.blocks}
        />
      ))}
    </div>
  );
}
