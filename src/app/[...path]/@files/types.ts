export interface FileDescriptor {
  path: string;
  name: string;
  isDirectory: boolean;
  size?: number;
}
