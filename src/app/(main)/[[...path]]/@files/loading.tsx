"use client";

import { IllustratedMessage, ProgressCircle } from "@adobe/react-spectrum";

export default function Loading() {
  return (
    <IllustratedMessage>
      <ProgressCircle isIndeterminate />
    </IllustratedMessage>
  );
}
