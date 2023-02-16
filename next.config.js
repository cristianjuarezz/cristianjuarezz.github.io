/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    PROJECTS_DB: process.env.PROJECTS_DB
  }
}

module.exports = nextConfig
