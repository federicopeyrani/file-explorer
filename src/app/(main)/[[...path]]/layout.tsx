import { ReactNode } from "react";

export default function Layout({
  files,
  side,
  top,
}: Record<string, ReactNode>) {
  return (
    <>
      <aside className="row-start-2">{side}</aside>
      <header className="col-start-2">{top}</header>
      <main className="row-span-2 col-span-2 h-full w-full overflow-hidden">
        {files}
      </main>
    </>
  );
}
