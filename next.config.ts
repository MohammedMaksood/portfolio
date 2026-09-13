import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,

  /**
   * The project lives on /mnt/c, a Windows drive mounted into WSL. inotify
   * events do not cross that boundary, so the dev server never sees file
   * changes and silently serves a stale compile. Polling is the fix; it
   * costs a little idle CPU and is dev-only.
   */
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 800,
        /* Long enough that a burst of edits becomes one rebuild. Short
         * settle times make Next read a build manifest while webpack is
         * still writing it, which shows up as "Unexpected end of JSON
         * input" in the dev log. */
        aggregateTimeout: 700,
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

export default nextConfig;
