import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export', // ← Important pour Cloudflare Pages
    images: {
        unoptimized: true // ← Si tu utilises <Image />, requis pour export
    },
};

export default nextConfig;
