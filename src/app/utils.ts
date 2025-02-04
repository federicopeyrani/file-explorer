import { startTransition, TransitionFunction } from "react";

export const withTransition =
  <Args extends unknown[]>(
    fn: (...args: Args) => ReturnType<TransitionFunction>,
  ) =>
  (...args: Args) => {
    startTransition(() => fn(...args));
  };
