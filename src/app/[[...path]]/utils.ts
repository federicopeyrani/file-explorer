import { URIPath } from "@/app/[[...path]]/types";
import path from "node:path";
import { useMemo } from "react";
import { Key } from "@react-types/shared";

export const emptyPath: URIPath = [] as unknown as URIPath;

export const decodePath = (path: URIPath = emptyPath) =>
  path.map(decodeURIComponent);

export const uriPathToFileURL = (
  base: string,
  uriPath: URIPath = emptyPath,
) => {
  if (uriPath.length === 0) {
    return Bun.pathToFileURL(base);
  }

  const pathname = path.join(base, ...decodePath(uriPath));
  return Bun.pathToFileURL(pathname);
};

export const splitPath = (pathString: string): string[] =>
  pathString.split(path.sep).slice(1);

export const toURL = (segments: string[]) =>
  `/${segments.map(encodeURIComponent).join("/")}`;

export const useCool = <T, R>(map: (it: T) => R, dep: T) =>
  useMemo(() => map(dep), [map, dep]);

export const keyed =
  <T>(key: (it: T) => Key) =>
  (array: T[]) =>
    array.map((value) => ({ key: key(value), ...value }));

const units = [
  "byte",
  "kilobyte",
  "megabyte",
  "gigabyte",
  "terabyte",
  "petabyte",
] as const;

const getValueAndUnit = (size: number) => {
  const index = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  const value = size / Math.pow(1024, index);
  return { value, unit: units[index] };
};

export const formatSize = (size: number) => {
  const { unit, value } = getValueAndUnit(size);

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "unit",
    unit,
    unitDisplay: "narrow",
  }).format(value);
};
