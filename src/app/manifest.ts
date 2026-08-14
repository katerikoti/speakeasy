import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Speakeasy",
    short_name: "Speakeasy",
    description: "Daily speaking practice, one spin at a time.",
    start_url: "/",
    display: "standalone",
    background_color: "#EDEDE9",
    theme_color: "#EDEDE9",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
