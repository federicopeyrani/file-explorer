"use client";

import { Breadcrumbs, Item } from "@adobe/react-spectrum";
import { toURL } from "@/app/[[...path]]/utils";

export const FilesBreadcrumbs = ({ url }: { url: [string, ...string[]] }) => (
  <Breadcrumbs>
    {url.map((part, index) => (
      <Item key={index} href={toURL(url.slice(1, index + 1))}>
        {part}
      </Item>
    ))}
  </Breadcrumbs>
);
