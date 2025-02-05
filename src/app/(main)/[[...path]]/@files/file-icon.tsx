import { FileDescriptor } from "@/app/(main)/[[...path]]/@files/types";
import { Icon } from "@/components";

const BaseIcon: typeof Icon = ({ className, children }) => (
  <Icon className={["text-[1.5em]", className]}>{children}</Icon>
);

export const FileIcon = ({
  kind,
  name,
}: {
  kind: FileDescriptor["kind"];
  name: string;
}) => {
  const extension = name.split(".").pop();

  if (kind === "directory") {
    return <BaseIcon>folder</BaseIcon>;
  }

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
    case "webp":
    case "avif":
    case "apng":
    case "bmp":
    case "ico":
    case "tiff":
    case "tif":
    case "heif":
    case "heic":
      return <BaseIcon className="text-blue-500">image</BaseIcon>;
    case "pdf":
      return <BaseIcon className="text-red-500">description</BaseIcon>;
    case "doc":
    case "docx":
      return <BaseIcon className="text-blue-500">description</BaseIcon>;
    case "txt":
    case "md":
    case "markdown":
    case "rst":
    case "rtf":
      return <BaseIcon>description</BaseIcon>;
    case "zip":
    case "tar":
    case "gz":
      return <BaseIcon className="text-yellow-500">folder_zip</BaseIcon>;
    case "js":
    case "ts":
    case "jsx":
    case "tsx":
      return <BaseIcon className="text-purple-500">code_blocks</BaseIcon>;
  }

  return <BaseIcon>question_mark</BaseIcon>;
};
