export type ParsedVideo = {
  provider: "youtube" | "vimeo";
  /** Player URL, already carrying autoplay and any unlisted-video token. */
  embedSrc: string;
  /** Poster frame, when the provider exposes one from the id alone. */
  poster: string | null;
};

/** Shown to admins when a pasted link can't be embedded. */
export const SUPPORTED_VIDEO_HOSTS = "YouTube or Vimeo";

function parseYoutube(u: URL): ParsedVideo | null {
  const host = u.hostname.replace(/^www\./, "");

  let id: string | null = null;
  if (host === "youtu.be") {
    id = u.pathname.slice(1).split("/")[0] || null;
  } else if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    id = u.searchParams.get("v");
    if (!id) {
      const m = u.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
      id = m ? m[1] : null;
    }
  }
  if (!id) return null;

  return {
    provider: "youtube",
    embedSrc: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
    poster: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

function parseVimeo(u: URL): ParsedVideo | null {
  const host = u.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;

  // vimeo.com/123, vimeo.com/123/abc123 (unlisted), player.vimeo.com/video/123
  const m = u.pathname.match(/^\/(?:video\/)?(\d+)(?:\/([0-9a-zA-Z]+))?/);
  if (!m) return null;

  const [, id, pathHash] = m;
  const hash = pathHash ?? u.searchParams.get("h");

  const params = new URLSearchParams({
    autoplay: "1",
    byline: "0",
    title: "0",
    dnt: "1",
  });
  if (hash) params.set("h", hash);

  return {
    provider: "vimeo",
    embedSrc: `https://player.vimeo.com/video/${id}?${params}`,
    // Vimeo poster frames aren't derivable from the id — they need an oEmbed
    // round trip. Admins supply a thumbnail URL instead.
    poster: null,
  };
}

/**
 * Resolves the URL shapes an admin is likely to paste into an embeddable
 * player. Returns null for anything we can't render.
 */
export function parseVideoUrl(url: string): ParsedVideo | null {
  try {
    const u = new URL(url.trim());
    return parseYoutube(u) ?? parseVimeo(u);
  } catch {
    return null;
  }
}

/** Zod refinement: allow empty (field is optional) or an embeddable URL. */
export function isEmbeddableOrEmpty(value: string | undefined): boolean {
  if (!value || value.trim() === "") return true;
  return parseVideoUrl(value) !== null;
}
