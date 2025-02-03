"use client";

import { Content, Heading, IllustratedMessage } from "@adobe/react-spectrum";

export default function Error({ error }: { error: Error }) {
  return (
    <IllustratedMessage width="100vh" height="100vh">
      <Heading>Error</Heading>
      <Content>{error.message}</Content>
    </IllustratedMessage>
  );
}
