"use client";

import { Item, ListBox } from "@adobe/react-spectrum";
import { keyed, useCool } from "@/app/[[...path]]/utils";
import { usePathname } from "next/navigation";

export type Option = {
  label: string;
  value: string;
};

const getKey = keyed((option: Option) => option.value);

export const QuickNav = ({ options }: { options: Option[] }) => {
  const pathname = usePathname();
  const optionsWithKey = useCool(getKey, options);

  return (
    <ListBox
      selectionMode="single"
      selectedKeys={[pathname]}
      items={optionsWithKey}
    >
      {(option) => <Item href={option.value}>{option.label}</Item>}
    </ListBox>
  );
};
