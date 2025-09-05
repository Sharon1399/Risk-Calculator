/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
      return [  
          {
              source: '/metrics',
              destination: '/api/metrics',
          },
      ];
  },
};

module.exports = nextConfig;


