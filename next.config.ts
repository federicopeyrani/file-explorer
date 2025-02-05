import type { NextConfig } from "next";
import { glob } from "glob";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: [
    "@adobe/react-spectrum",
    "@react-spectrum/*",
    "@spectrum-icons/*",
  ].flatMap((spec) => glob.sync(`${spec}`, { cwd: "node_modules/" })),
};

export default nextConfig;
