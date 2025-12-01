// lib/api.js

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://sapi.dramabox.be";
const DEFAULT_LANG = process.env.NEXT_PUBLIC_DEFAULT_LANG || "in";

async function fetchJson(path, { revalidate = 60, ...init } = {}) {
  const url = `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    ...init,
    next: { revalidate },
  });

  if (!res.ok) {
    console.error("Gagal fetch Dramabox:", res.status, url);
    throw new Error(`Gagal mengambil data (${res.status})`);
  }

  const json = await res.json();
  if (json && json.success === false) {
    throw new Error("API Dramabox mengembalikan success=false");
  }
  return json;
}

// Normalisasi 1 item drama supaya field-nya rapi & konsisten
function mapDramaItem(raw) {
  if (!raw) return null;

  const bookId =
    raw.bookId ?? raw.book_id ?? raw.id ?? raw.dramaId ?? raw.drama_id;
  const bookName =
    raw.bookName ??
    raw.title ??
    raw.name ??
    raw.dramaName ??
    raw.dramaTitle;

  const cover =
    raw.cover ??
    raw.coverVertical ??
    raw.verticalCover ??
    raw.poster ??
    raw.image;

  const chapterCount =
    raw.chapterCount ??
    raw.totalEpisodes ??
    raw.episodeCount ??
    raw.chapterTotal;

  const playCount =
    raw.playCount ?? raw.playTimes ?? raw.viewCount ?? raw.views;

  const tags =
    Array.isArray(raw.tags) && raw.tags.length
      ? raw.tags
      : Array.isArray(raw.tagList)
      ? raw.tagList
      : [];

  return {
    bookId,
    bookName,
    introduction:
      raw.introduction ?? raw.brief ?? raw.description ?? raw.detail,
    cover,
    chapterCount,
    playCount,
    tags,
    corner: raw.corner ?? raw.badge ?? null,
    raw, // simpan raw kalau mau dipakai nanti
  };
}

function toListResult(json) {
  const data = json?.data || {};
  const rawList = data.list || data.items || data.result || [];
  const list = rawList.map(mapDramaItem).filter(Boolean);

  return {
    items: list,
    isMore: Boolean(data.isMore ?? data.hasMore),
    total: data.total ?? data.totalCount ?? list.length,
  };
}

// ===================== LIST ENDPOINT =====================

// Rekomendasi utama: /api/foryou/{page}
export async function getForYou(page = 1, lang = DEFAULT_LANG) {
  const json = await fetchJson(`/api/foryou/${page}?lang=${lang}`);
  return toListResult(json);
}

// Rilis terbaru: /api/new/{page}?pageSize=
export async function getNewList(
  page = 1,
  pageSize = 10,
  lang = DEFAULT_LANG
) {
  const json = await fetchJson(
    `/api/new/${page}?lang=${lang}&pageSize=${pageSize}`
  );
  return toListResult(json);
}

// Peringkat populer: /api/rank/{page}
export async function getRank(page = 1, lang = DEFAULT_LANG) {
  const json = await fetchJson(`/api/rank/${page}?lang=${lang}`);
  return toListResult(json);
}

// Filter / classify: /api/classify?lang=in&pageNo=&genre=&sort=
export async function classify({
  pageNo = 1,
  genre,
  sort = 1,
  lang = DEFAULT_LANG,
}) {
  const params = new URLSearchParams({
    lang,
    pageNo: String(pageNo),
    sort: String(sort),
  });

  if (genre) params.set("genre", String(genre));

  const json = await fetchJson(`/api/classify?${params.toString()}`);
  return toListResult(json);
}

// Search: /api/search/{keyword}/{page}
export async function searchDrama(keyword, page = 1, lang = DEFAULT_LANG) {
  const encoded = encodeURIComponent(keyword.trim());
  const json = await fetchJson(
    `/api/search/${encoded}/${page}?lang=${lang}`,
    { revalidate: 15 }
  );
  return toListResult(json);
}

// Suggest keyword: /api/suggest/{keyword}
export async function suggestKeyword(keyword, lang = DEFAULT_LANG) {
  const encoded = encodeURIComponent(keyword.trim());
  const json = await fetchJson(`/api/suggest/${encoded}?lang=${lang}`, {
    revalidate: 10,
  });
  return json?.data || {};
}

// ===================== DETAIL & PLAYER =====================

// Daftar episode: /api/chapters/{bookId}
export async function getChapters(bookId, lang = DEFAULT_LANG) {
  const json = await fetchJson(`/api/chapters/${bookId}?lang=${lang}`, {
    revalidate: 120,
  });

  const data = json?.data || {};
  const chapterList = data.chapterList || data.chapters || [];
  const info =
    data.bookInfo ||
    data.info || {
      bookId,
    };

  return {
    info,
    chapters: chapterList,
  };
}

// Stream via GET: /api/watch/{bookId}/{chapterIndex}
export async function getWatch(
  bookId,
  chapterIndex = 0,
  { lang = DEFAULT_LANG, source = "search_result" } = {}
) {
  const json = await fetchJson(
    `/api/watch/${bookId}/${chapterIndex}?lang=${lang}&source=${source}`,
    { revalidate: 0 }
  );
  return json?.data;
}

// Stream via POST: /api/watch/player
export async function postPlayer({
  bookId,
  chapterIndex = 0,
  lang = DEFAULT_LANG,
}) {
  const body = JSON.stringify({
    bookId: String(bookId),
    chapterIndex,
    lang,
  });

  const json = await fetchJson(`/api/watch/player?lang=${lang}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    revalidate: 0,
  });

  return json?.data;
}
