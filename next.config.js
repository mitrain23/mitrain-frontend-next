/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "0152-2a02-4780-10-d402-00-1.ngrok-free.app",
      "api.mitrainid.com",
      "static.nike.com",
    ],
  },
  env: {
    BASE_URL: process.env.REACT_APP_API_BASE_URL,
  },
};

module.exports = nextConfig;
