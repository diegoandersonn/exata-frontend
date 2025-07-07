import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["media.istockphoto.com", "luciano-marmita.s3.amazonaws.com"], // Adicione o domínio aqui
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
