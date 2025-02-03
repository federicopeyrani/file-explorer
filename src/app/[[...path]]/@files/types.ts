export interface FileDescriptor {
  key: string;
  fullPath: string;
  name: string;
  isDirectory: boolean;
  url: string;
  size?: number;
}
