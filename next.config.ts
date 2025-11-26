import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //temporario luciano-marmita
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "exata-bucket.s3.amazonaws.com" },
      { protocol: "https", hostname: "luciano-marmita.s3.amazonaws.com" },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
