import { FilesBreadcrumbs } from "@/app/[...path]/@title/files-breadcrumbs";

export default function Page({
  params,
}: {
  params: {
    path: string[];
  };
}) {
  return <FilesBreadcrumbs path={params.path.map(decodeURIComponent)} />;
}
