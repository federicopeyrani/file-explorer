import styles from "./icon.module.css";

export const Icon = ({ children }: { children: string }) => (
  <span className={styles.Icon}>{children}</span>
);
