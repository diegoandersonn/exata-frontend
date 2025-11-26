import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //temporario luciano-marmita
  images: {
    domains: ["media.istockphoto.com", "exata-bucket.s3.amazonaws.com", "luciano-marmita.s3.amazonaws.com"], // Adicione o domínio aqui
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
