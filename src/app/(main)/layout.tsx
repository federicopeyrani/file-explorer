import { Space } from "@/app/(main)/[[...path]]/@side/space";
import { FilesViewSettingsWrapper } from "@/app/(main)/files-view-settings-wrapper";
import { cookies } from "next/headers";
import { FilesViewSettings } from "@/app/(main)/files-view-settings-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { get } = await cookies();

  const mode = get("mode")?.value;
  const density = get("density")?.value;

  const action = async (payload: Partial<FilesViewSettings>) => {
    "use server";
    const { set } = await cookies();
    console.log(payload);
    Object.entries(payload).forEach(([key, value]) => set(key, value));
  };

  return (
    <div className="h-screen w-screen overflow-hidden p-8 pb-2 grid grid-rows-[auto,auto,1fr] grid-cols-[12rem,1fr,auto] gap-8">
      <aside className="row-start-3">
        <Space />
      </aside>

      <FilesViewSettingsWrapper
        action={action}
        initial={{
          mode: mode === "list" || mode === "table" ? mode : "list",
          density:
            density === "compact" ||
            density === "regular" ||
            density === "spacious"
              ? density
              : "regular",
        }}
      >
        {children}
      </FilesViewSettingsWrapper>
    </div>
  );
}
