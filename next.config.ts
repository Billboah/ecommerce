import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [new URL("https://fakestoreapi.com/img/**")],
  },
};

export default nextConfig;
