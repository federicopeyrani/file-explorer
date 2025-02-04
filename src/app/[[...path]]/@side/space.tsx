import { disksEntries } from "@/config";
import { SpaceMeter } from "@/app/[[...path]]/@side/space-meter";
import { statfs } from "node:fs/promises";

export const Space = async ({ url }: { url: URL }) => {
  const space = await statfs(url);

  return (
    <>
      {disksEntries.map((disk) => (
        <SpaceMeter
          key={disk.value}
          label={disk.label}
          free={space.bsize * space.bavail}
          total={space.bsize * space.blocks}
        />
      ))}
    </>
  );
};
