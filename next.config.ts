import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export only for production builds (npm run build); served at /kanbit.
  // npm run dev serves at the root; a local API server + rewrites handle /api/*.
  output: isProd ? "export" : undefined,
  basePath: isProd ? "/kanbit" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/kanbit" : "",
  },
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isProd
    ? {}
    : {
        async rewrites() {
          return [
            {
              source: "/api/:path*",
              destination: "http://localhost:3100/api/:path*",
            },
          ];
        },
      }),
};

export default nextConfig;
