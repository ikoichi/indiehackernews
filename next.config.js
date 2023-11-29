/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/pirsch-extended.js",
        destination: "https://api.pirsch.io/pirsch-extended.js",
      },
    ];
  },
};

module.exports = nextConfig;
