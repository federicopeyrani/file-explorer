"use client";

import { createContext, useContext } from "react";

export interface FilesViewSettings {
  mode: "table" | "list";
  density: "compact" | "regular" | "spacious";
}

export interface FilesViewSettingsProviderProps {
  settings: FilesViewSettings;
}

const FilesViewSettingsContext = createContext<
  FilesViewSettingsProviderProps | undefined
>(undefined);

export const FilesViewSettingsProvider = (
  props: FilesViewSettingsProviderProps & { children: React.ReactNode },
) => (
  <FilesViewSettingsContext.Provider value={props}>
    {props.children}
  </FilesViewSettingsContext.Provider>
);

export const useFilesViewSettings = () => {
  const context = useContext(FilesViewSettingsContext);

  if (!context) {
    throw new Error(
      "useFilesViewSettings must be used within a FilesViewSettingsProvider",
    );
  }

  return context.settings;
};
