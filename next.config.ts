import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const inferredGithubPagesBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}` : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredGithubPagesBasePath;

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
