import { FileDescriptor } from "@/app/[[...path]]/@files/types";
import { useDragAndDrop, Key } from "@adobe/react-spectrum";
import { error } from "@/utils";

const type = "custom-app-type-reorder";

export const useDragAndDropMove = ({
  files,
  onMove,
}: {
  files: FileDescriptor[];
  onMove?: (source: FileDescriptor[], target: FileDescriptor) => void;
}) => {
  const findOrFail = (key: Key) =>
    files.find((file) => file.key === key) ?? error("Failed to find file");

  const { dragAndDropHooks } = useDragAndDrop({
    acceptedDragTypes: [type],
    getItems: (keys) =>
      [...keys]
        .map(findOrFail)
        .filter((item) => item !== undefined)
        .map((item) => ({
          [type]: item.key ?? error("Failed to find key"),
          "text/plain": item.fullPath ?? error("Failed to find fullPath"),
        })),
    getAllowedDropOperations: () => ["move"],
    getDropOperation: (target) => {
      if (target.type === "root") {
        return "cancel";
      }

      const targetFile = findOrFail(target.key);

      if (targetFile.kind === "directory" && target.dropPosition === "on") {
        return "move";
      }

      return "cancel";
    },
    onItemDrop: async ({ target, items }) => {
      const targetFile = findOrFail(target.key);

      const sourceFiles = items
        .map(async (item) =>
          item.kind === "text" ? item.getText(type) : error("Item is not text"),
        )
        .map(async (key) => findOrFail(await key));

      onMove?.(await Promise.all(sourceFiles), targetFile);
    },
  });

  return {
    dragAndDropHooks: onMove ? dragAndDropHooks : undefined,
  };
};
