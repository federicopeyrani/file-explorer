import { PathParams } from "@/app/(main)/[[...path]]/types";
import { FilesBreadcrumbs } from "@/app/(main)/[[...path]]/@top/files-breadcrumbs";
import { decodePath } from "@/app/(main)/[[...path]]/utils";
import { base } from "@/config";

export default async function Page({ params }: PathParams) {
  const { path } = await params;
  return <FilesBreadcrumbs url={[base, ...decodePath(path)]} />;
}
