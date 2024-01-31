/** @type {import('next').NextConfig} */
const semi = require('@douyinfe/semi-next').default({});

const nextConfig = semi({
  reactStrictMode: true,
  images: {
    domains: ["127.0.0.1"],
  }
})

module.exports = nextConfig
