import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Включает строгий режим React для обнаружения потенциальных проблем
  reactStrictMode: true,


  images: {
    domains: ['res.cloudinary.com'],
  },


  // Настройки перенаправлений (rewrites)
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*", // Прокси-запросы к API-серверу
      },
    ];
  },

  // Настройка Webpack для использования alias `@`
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
