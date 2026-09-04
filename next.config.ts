import type { NextConfig } from "next";

// `output: 'standalone'` HANYA dibutuhkan untuk build Docker
// (.next/standalone). Di Vercel standalone tidak dipakai dan justru
// memicu ENOENT next-server.js.nft.json — jadi aktifkan kondisional
// lewat env yang di-set di Dockerfile (OUTPUT_STANDALONE=1).
const isStandalone = process.env.OUTPUT_STANDALONE === "1";

const nextConfig: NextConfig = {
  ...(isStandalone ? { output: "standalone" } : {}),
};

export default nextConfig;
