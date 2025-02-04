"use client";

import { Breadcrumbs, Item } from "@adobe/react-spectrum";
import { decodedToURL } from "@/app/(main)/[[...path]]/utils";
import { NotEncoded } from "@/app/(main)/[[...path]]/types";

export const FilesBreadcrumbs = ({
  url,
}: {
  url: [string & NotEncoded, ...(string & NotEncoded)[]];
}) => (
  <Breadcrumbs>
    {url.map((part, index) => (
      <Item key={index} href={decodedToURL(...url.slice(1, index + 1))}>
        {part}
      </Item>
    ))}
  </Breadcrumbs>
);
