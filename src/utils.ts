import { Key } from "@react-types/shared";
import { Selection } from "@adobe/react-spectrum";

export const error = (message: string) => {
  throw new Error(message);
};

export const withSingleSelection =
  <K extends Key>(fn: (key: K) => void) =>
  (selection: Selection) => {
    if (selection === "all") {
      throw new Error("Cannot handle 'all' selection");
    }

    const key = [...selection.values()][0] ?? error("No key selected");

    fn(key as K);
  };
