import { PathParams } from "@/app/[[...path]]/types";
import {
  emptyPath,
  encodedToURL,
  uriPathToFileURL,
} from "@/app/[[...path]]/utils";
import { QuickNav } from "@/app/[[...path]]/@side/quick-nav";
import { base, quickLinksEntries } from "@/config";
import { Space } from "@/app/[[...path]]/@side/space";
import { Suspense } from "react";

export default async function Page({ params }: PathParams) {
  const { path = emptyPath } = await params;
  const fileURL = uriPathToFileURL(base, path);

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

      <Suspense>
        <Space url={fileURL} />
      </Suspense>
    </div>
  );
}
