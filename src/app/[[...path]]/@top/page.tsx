import { PathParams } from "@/app/[[...path]]/types";
import { FilesBreadcrumbs } from "@/app/[[...path]]/@top/files-breadcrumbs";
import { decodePath } from "@/app/[[...path]]/utils";
import { base } from "@/config";

export default async function Page({ params }: PathParams) {
  const { path } = await params;
  return <FilesBreadcrumbs url={[base, ...decodePath(path)]} />;
}
