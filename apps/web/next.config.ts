import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@mashcode/contracts",
    "@mashcode/domain",
    "@mashcode/realtime-protocol"
  ]
};

export default nextConfig;
