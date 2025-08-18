import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "edzuebatbrwelveixxgg.supabase.co",
      },
    ],
  },
};
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default nextConfig;
