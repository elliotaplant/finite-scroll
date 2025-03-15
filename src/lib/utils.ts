import { z } from "zod";

export const urlSchema = z
  .string()
  .url()
  .refine((url) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.toLowerCase();
      return (
        hostname === "reddit.com" ||
        hostname.endsWith(".reddit.com") ||
        hostname === "twitter.com" ||
        hostname === "x.com" ||
        hostname.endsWith(".twitter.com") ||
        hostname.endsWith(".x.com")
      );
    } catch {
      return false;
    }
  }, "URL must be from Reddit or Twitter/X");

export function getServiceType(url: string): "reddit" | "twitter" | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname === "reddit.com" || hostname.endsWith(".reddit.com")) {
      return "reddit";
    }

    if (
      hostname === "twitter.com" ||
      hostname === "x.com" ||
      hostname.endsWith(".twitter.com") ||
      hostname.endsWith(".x.com")
    ) {
      return "twitter";
    }

    return null;
  } catch {
    return null;
  }
}
