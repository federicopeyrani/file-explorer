"use client";

import { SWRConfig, SWRConfiguration, unstable_serialize, Key } from "swr";
import { PropsWithChildren } from "react";

export type SWRClientProviderConfiguration = Omit<
  SWRConfiguration,
  "fallback"
> & {
  fallback?: [key: Key, data?: unknown][];
};

export const SWRClientProvider = ({
  children,
  fallback,
  ...config
}: PropsWithChildren<SWRClientProviderConfiguration>) => (
  <SWRConfig
    value={{
      fallback: fallback
        ? Object.fromEntries(
            fallback.map(([key, data]) => [unstable_serialize(key), data]),
          )
        : undefined,
      keepPreviousData: true,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      ...config,
    }}
  >
    {children}
  </SWRConfig>
);
