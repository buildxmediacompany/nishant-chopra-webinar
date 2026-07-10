import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Seed/placeholder media — safe to remove once real assets are
      // uploaded to your own storage (S3/GCS/Cloudinary/etc) via /admin.
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "picsum.photos" },
      // YouTube poster frames for hero / testimonial / showcase embeds.
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      // Client's existing media library.
      { protocol: "https", hostname: "images.leadconnectorhq.com" },
      { protocol: "https", hostname: "assets.cdn.filesafe.space" },
    ],
  },
};

export default nextConfig;
