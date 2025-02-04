import { useMemo } from "react";
import path from "path";
import { Key } from "@react-types/shared";
import { Encoded, NotEncoded, URIPath } from "@/app/[[...path]]/types";

export const emptyPath: URIPath = [] as unknown as URIPath;

export const decodePath = (path: URIPath = emptyPath) =>
  path.map(decodeURIComponent);

export const joinPathToString = (...paths: ((string & NotEncoded) | URL)[]) =>
  path.join(
    ...paths
      .map((it) => (it instanceof URL ? it.pathname : it))
      .map(decodeURIComponent),
  );

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

export const encode = (...segments: string[]) =>
  segments.map(encodeURIComponent) as (string & Encoded)[];

export const encodedToURL = (...segments: (string & Encoded)[]) =>
  `/${segments.join("/")}` as const;

export const decodedToURL = (...segments: (string & NotEncoded)[]) =>
  `/${segments.map(encodeURIComponent).join("/")}` as const;

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
