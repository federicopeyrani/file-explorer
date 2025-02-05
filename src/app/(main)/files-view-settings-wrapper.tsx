"use client";

import {
  FilesViewSettings,
  FilesViewSettingsProvider,
} from "@/app/(main)/files-view-settings-provider";
import { FilesViewModeSelector } from "@/app/(main)/files-view-mode-selector";
import { ReactNode, useOptimistic } from "react";
import { withTransition } from "@/app/utils";
import { FilesViewDensitySelector } from "@/app/(main)/files-view-density-selector";

export const FilesViewSettingsWrapper = ({
  action,
  children,
  initial,
}: {
  children: ReactNode;
  action: (payload: Partial<FilesViewSettings>) => Promise<void>;
  initial: FilesViewSettings;
}) => {
  const [optimisticSettings, optimisticDispatch] = useOptimistic(
    initial,
    (state, payload: Partial<FilesViewSettings>) => ({ ...state, ...payload }),
  );

  const dispatch = async (payload: Partial<FilesViewSettings>) => {
    withTransition(optimisticDispatch)(payload);
    await action(payload);
  };

  return (
    <FilesViewSettingsProvider settings={optimisticSettings}>
      <div className="row-start-1 col-start-3 flex flex-row gap-2">
        <FilesViewModeSelector
          value={optimisticSettings.mode}
          onChange={(mode) => dispatch({ mode })}
        />
        <FilesViewDensitySelector
          value={optimisticSettings.density}
          onChange={(density) => dispatch({ density })}
        />
      </div>

      {children}
    </FilesViewSettingsProvider>
  );
};
