"use client";

import { defaultTheme, Provider } from "@adobe/react-spectrum";

export const ThemeProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => (
  <Provider theme={defaultTheme}>{children}</Provider>
);
