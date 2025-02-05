import {
  FileDescriptor,
  FilesAction,
} from "@/app/(main)/[[...path]]/@files/types";
import { Key, useDragAndDrop } from "@adobe/react-spectrum";
import { error } from "@/utils";
import { useRouter } from "next/navigation";

const customAppTypeKey = "text/x-custom-app-key";

const customAppTypeFullPath = "text/x-custom-app-full-path";

export const useDragAndDropMove = ({
  files,
  action,
}: {
  files: FileDescriptor[];
  action?: FilesAction<void>;
}) => {
  const findOrFail = (key: Key) =>
    files.find((file) => file.key === key) ?? error("Failed to find file");

  const router = useRouter();

  const { dragAndDropHooks } = useDragAndDrop({
    acceptedDragTypes: ["application/octet-stream", customAppTypeKey],

    getItems: (keys) =>
      [...keys].map(findOrFail).map((item) => ({
        [customAppTypeKey]: item.key,
        [customAppTypeFullPath]: item.fullPath,
        "text/plain": item.fullPath,
      })),

    getAllowedDropOperations: () => ["move"],

    getDropOperation: (target) => {
      if (target.type === "root") {
        return "move";
      }

      const targetFile = findOrFail(target.key);

      if (targetFile.kind === "directory" && target.dropPosition === "on") {
        return "move";
      }

      return "cancel";
    },

    onDragEnd: ({ isInternal }) => {
      if (!isInternal) {
        action?.({ type: "refresh" });
      }
    },

    onDropActivate: ({ target }) => {
      if (target.type === "root") {
        return;
      }

      const targetFile = findOrFail(target.key);
      router.push(targetFile.url);
    },

    onRootDrop: async ({ items }) => {
      const sourceFullPaths = items.map(async (item) =>
        item.kind === "text"
          ? item.getText(customAppTypeFullPath)
          : error("Item is not text"),
      );

      action?.({ type: "move", source: await Promise.all(sourceFullPaths) });
    },

    onItemDrop: async ({ target, items }) => {
      const targetFile = findOrFail(target.key);

      const sourceFiles = items.map(async (item) =>
        item.kind === "text"
          ? item.getText(customAppTypeFullPath)
          : error("Item is not text"),
      );

      action?.({
        type: "move",
        source: await Promise.all(sourceFiles),
        target: targetFile,
      });
    },
  });

  return {
    dragAndDropHooks: action ? dragAndDropHooks : undefined,
  };
};
