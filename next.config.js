/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静的エクスポートを有効にする
  images: {
    unoptimized: true, // Image Optimization API を無効化
  },
};

module.exports = nextConfig;
