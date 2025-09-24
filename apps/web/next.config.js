/**** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.WEB_URL || 'http://localhost:3000']
    }
  },
};

module.exports = nextConfig;
