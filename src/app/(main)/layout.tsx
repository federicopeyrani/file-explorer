import { Space } from "@/app/(main)/[[...path]]/@side/space";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden p-8 pb-2 grid grid-rows-[auto,auto,1fr] grid-cols-[12rem,1fr] gap-8">
      <aside className="row-start-3">
        <Space />
      </aside>
      {children}
    </div>
  );
}
