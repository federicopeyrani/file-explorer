import { ReactNode } from "react";

export default function Layout({ title, files }: Record<string, ReactNode>) {
  return (
    <div className="h-screen w-screen overflow-hidden p-8 pb-2 grid-rows-[auto,1fr] grid-cols-[8rem,1fr] grid gap-4">
      <h1 className="row-span-2">Files</h1>
      {title}
      <main>{files}</main>
    </div>
  );
}
