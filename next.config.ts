import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.shape.ma" }],
        destination: "https://shape.ma/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
