"use client";

import { darkTheme, Provider } from "@adobe/react-spectrum";
import { useRouter } from "next/navigation";

declare module "@adobe/react-spectrum" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export const RootProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();

  return (
    <Provider theme={darkTheme} router={{ navigate: router.push }}>
      {children}
    </Provider>
  );
};
