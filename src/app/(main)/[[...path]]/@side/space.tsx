import { disksEntries } from "@/config";
import { SpaceMeter } from "@/app/(main)/[[...path]]/@side/space-meter";
import { statfs } from "node:fs/promises";

export const Space = async () => {
  return (
    <>
      {disksEntries.map(async (disk) => {
        const space = await statfs(disk.value);
        return (
          <SpaceMeter
            key={disk.value}
            label={disk.label}
            free={space.bsize * space.bavail}
            total={space.bsize * space.blocks}
          />
        );
      })}
    </>
  );
};
