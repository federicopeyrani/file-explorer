import { PathParams } from "@/app/(main)/[[...path]]/types";
import { emptyPath, encodedToURL } from "@/app/(main)/[[...path]]/utils";
import { QuickNav } from "@/app/(main)/[[...path]]/@side/quick-nav";
import { quickLinksEntries } from "@/config";

export default async function Page({ params }: PathParams) {
  const { path = emptyPath } = await params;

  return (
    <div className="flex flex-col items-stretch gap-8 overflow-hidden">
      <QuickNav
        selectedKey={decodeURIComponent(encodedToURL(...path))}
        options={quickLinksEntries.map((entry) => ({
          key: entry.value,
          label: entry.label,
          url: entry.value,
        }))}
      />
    </div>
  );
}
