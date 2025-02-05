import styles from "./icon.module.css";
import { ClassValue, clsx } from "clsx";

export const Icon = ({
  className,
  children,
}: {
  className?: ClassValue;
  children: string;
}) => <span className={clsx(styles.Icon, className)}>{children}</span>;
