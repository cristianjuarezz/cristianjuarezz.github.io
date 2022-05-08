/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
	loader: 'akamai',
	path: '',
  },
  reactStrictMode: true,
  assetPrefix: isProd ? 'https://cristianjuarezz.github.io' : '',
}

module.exports = nextConfig
