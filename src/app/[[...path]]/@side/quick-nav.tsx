"use client";

import { Item, ListBox } from "@adobe/react-spectrum";
import { Key } from "@react-types/shared";

export type Option = {
  key: Key;
  label: string;
  url: string;
};

export const QuickNav = ({
  selectedKey,
  options,
}: {
  selectedKey: Key;
  options: Option[];
}) => (
  <ListBox selectionMode="single" selectedKeys={[selectedKey]} items={options}>
    {(option) => <Item href={option.url}>{option.label}</Item>}
  </ListBox>
);
