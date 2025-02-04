import path from "path";
import { Encoded, NotEncoded, URIPath } from "@/app/(main)/[[...path]]/types";

export const emptyPath: URIPath = [] as unknown as URIPath;

export const decodePath = (path: URIPath = emptyPath) =>
  path.map(decodeURIComponent);

export const joinPathToString = (...paths: ((string & NotEncoded) | URL)[]) =>
  path.join(
    ...paths.map((it) =>
      it instanceof URL ? decodeURIComponent(it.pathname) : it,
    ),
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
  `/${segments.join("/")}` as `/${string}` & Encoded;

export const decodedToURL = (...segments: (string & NotEncoded)[]) =>
  `/${segments.map(encodeURIComponent).join("/")}` as const;

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
