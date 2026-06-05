/**
 * Hero clip URLs: local files under /public/videos/clutch/ or a CDN/R2 prefix.
 * Set VITE_HERO_VIDEO_CDN (no trailing slash), e.g. https://media.clutchfuel.com
 */
const CDN_BASE = (import.meta.env.VITE_HERO_VIDEO_CDN ?? "").replace(/\/$/, "");

export function heroVideoUrl(filename: string): string {
  const path = `/videos/clutch/${filename}`;
  return CDN_BASE ? `${CDN_BASE}${path}` : path;
}
