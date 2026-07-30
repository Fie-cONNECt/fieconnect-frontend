import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLandlord(user: { userType?: string } | null | undefined): boolean {
  return user?.userType === 'LANDLORD';
}

export function isTenant(user: { userType?: string } | null | undefined): boolean {
  return user?.userType === 'TENANT';
}

/** Convert a YouTube / Vimeo / TikTok watch URL into an embeddable iframe src. */
export function getVideoEmbedUrl(url: string | null | undefined): string | null {
  if (!url?.trim()) return null;
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.replace(/^\//, '').split('/')[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      const id =
        parsed.searchParams.get('v') ||
        parsed.pathname.match(/\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean).pop();
      return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (host === 'tiktok.com' || host === 'm.tiktok.com') {
      const fromPath =
        parsed.pathname.match(/\/video\/(\d+)/)?.[1] ||
        parsed.pathname.match(/\/embed\/(?:v2\/)?(\d+)/)?.[1];
      return fromPath ? `https://www.tiktok.com/embed/v2/${fromPath}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export function isTikTokVideoUrl(url: string | null | undefined): boolean {
  if (!url?.trim()) return false;
  try {
    const host = new URL(url.trim()).hostname.replace(/^www\./, '');
    return host === 'tiktok.com' || host === 'm.tiktok.com' || host === 'vm.tiktok.com';
  } catch {
    return false;
  }
}
