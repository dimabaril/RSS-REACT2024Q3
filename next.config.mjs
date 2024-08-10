/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./dist",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "starwars-visualguide.com",
        port: "",
        pathname: "/assets/img/characters/**",
      },
    ],
  },
};

export default nextConfig;
