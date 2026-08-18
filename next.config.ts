import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Мини-аппа встраивается в iframe Telegram — нужны корректные CSP-заголовки при деплое,
  // здесь только базовые headers, полноценный CSP настроим на инфре деплоя.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      },
    ];
  },
};

export default nextConfig;
