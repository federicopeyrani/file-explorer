import { ReactNode } from "react";

export default function Layout({
  files,
  side,
  top,
}: Record<string, ReactNode>) {
  return (
    <div className="h-screen w-screen overflow-hidden p-8 pb-2 grid grid-rows-[auto,1fr] grid-cols-[12rem,1fr] gap-4">
      <aside className="row-start-2">{side}</aside>
      <header className="col-start-2">{top}</header>
      <main className="h-full w-full overflow-hidden">{files}</main>
    </div>
  );
}
