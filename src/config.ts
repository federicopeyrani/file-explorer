const splitByLabelAndValue = (entry: string) => {
  const [label, value] = entry.split("=");
  return { label, value } as const;
};

export const base = Bun.env["BASE"] ?? "";

export const disksEntries =
  Bun.env["DISKS"]?.split(",")?.map(splitByLabelAndValue) ?? [];

export const quickLinksEntries =
  Bun.env["QUICKLINKS"]?.split(",")?.map(splitByLabelAndValue) ?? [];
