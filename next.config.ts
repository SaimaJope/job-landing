import type { NextConfig } from "next";

// Served from the root of the custom domain jobkauppa.fi (see public/CNAME), so
// basePath is empty. Set NEXT_PUBLIC_BASE_PATH only to preview under a project
// subpath such as saimajope.github.io/job-landing/.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
