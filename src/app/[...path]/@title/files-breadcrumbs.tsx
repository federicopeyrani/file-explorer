"use client";

import { Breadcrumbs, Item, Key } from "@adobe/react-spectrum";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const FilesBreadcrumbs = ({ path }: { path: string[] }) => {
  const router = useRouter();

  const handleAction = useCallback(
    (key: Key) => {
      const href = `/${path.slice(0, parseInt(String(key)) + 1).join("/")}`;
      void router.push(href);
    },
    [router, path],
  );

  return (
    <Breadcrumbs onAction={handleAction}>
      {path.map((part, index) => (
        <Item key={index}>{part}</Item>
      ))}
    </Breadcrumbs>
  );
};
