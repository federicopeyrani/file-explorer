"use client";

import { Meter } from "@adobe/react-spectrum";
import { formatSize } from "@/app/(main)/[[...path]]/utils";

export const SpaceMeter = ({
  label,
  free,
  total,
}: {
  label: string;
  free: number;
  total: number;
}) => {
  const value = ((total - free) / total) * 100;
  return (
    <Meter
      width="100%"
      label={label}
      value={value}
      valueLabel={`${formatSize(free)} of ${formatSize(total)}`}
    />
  );
};
