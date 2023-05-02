export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: string;
}
export interface GetUrlShortened {
  originalUrl: string;
}

export interface AllShortenedUrl {
  count: number | null;
  countToday: number | null;
  listShortenedUrl: ShortenedUrl[] | null;
}
