import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "export" : "standalone",
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@type': path.resolve(__dirname, 'src/types'),
      '@lib': path.resolve(__dirname, 'src/lib')
    };
    return config;
  },
  images: {
    unoptimized: isProd ? true : false,
  },
};

export default nextConfig;
