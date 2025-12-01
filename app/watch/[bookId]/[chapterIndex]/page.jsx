// app/watch/[bookId]/[chapterIndex]/page.jsx
import Link from "next/link";
import { getWatch, getChapters } from "@/lib/api";
import VideoPlayer from "@/components/VideoPlayer";
import EpisodeList from "@/components/EpisodeList";

export const dynamic = "force-dynamic";

export default async function WatchPage({ params }) {
  const { bookId, chapterIndex } = params;
  const index = Number(chapterIndex) || 0;

  let streamData = null;
  let info = null;
  let chapters = [];

  try {
    streamData = await getWatch(bookId, index);
  } catch (err) {
    console.error("Error getWatch:", err);
  }

  try {
    const data = await getChapters(bookId);
    info = data.info || null;
    chapters = data.chapters || [];
  } catch (err) {
    console.error("Error getChapters:", err);
  }

  const currentChapter =
    chapters.find(
      (ch, i) =>
        (ch.chapterIndex ?? ch.index ?? i) === index
    ) || chapters[index];

  const videoUrl =
    streamData?.videoUrl ||
    streamData?.playUrl ||
    streamData?.m3u8 ||
    streamData?.m3u8Url ||
    streamData?.url;

  const dramaTitle =
    info?.bookName || info?.title || info?.name || `Drama ${bookId}`;

  const episodeTitle =
    currentChapter?.chapterName ||
    currentChapter?.name ||
    currentChapter?.title ||
    `Episode ${index + 1}`;

  const fullTitle = `${dramaTitle} — ${episodeTitle}`;

  const prevIndex = Math.max(0, index - 1);
  const hasPrev = index > 0;
  const hasNext = chapters.length === 0 ? true : index + 1 < chapters.length;
  const nextIndex = index + 1;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Breadcrumb + back */}
      <div className="flex items-center justify-between gap-3 text-[11px] md:text-xs text-white/60">
        <div className="flex items-center gap-1">
          <Link href="/" className="hover:text-white">
            Beranda
          </Link>
          <span>/</span>
          <Link
            href={`/drama/${bookId}`}
            className="hover:text-white line-clamp-1 max-w-[60%]"
          >
            {dramaTitle}
          </Link>
          <span>/</span>
          <span className="text-white/80">{episodeTitle}</span>
        </div>
        <Link
          href={`/drama/${bookId}`}
          className="hidden sm:inline px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10"
        >
          ← Daftar Episode
        </Link>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        <div className="space-y-4">
          <h1 className="text-lg md:text-xl font-semibold tracking-tight">
            {dramaTitle}
          </h1>
          <p className="text-xs md:text-sm text-white/60">{episodeTitle}</p>

          <VideoPlayer src={videoUrl} title={fullTitle} />

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] md:text-xs text-white/70">
            <div className="flex gap-2">
              {hasPrev && (
                <Link
                  href={`/watch/${bookId}/${prevIndex}`}
                  className="px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10"
                >
                  ← Episode {prevIndex + 1}
                </Link>
              )}
              {hasNext && (
                <Link
                  href={`/watch/${bookId}/${nextIndex}`}
                  className="px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10"
                >
                  Episode {nextIndex + 1} →
                </Link>
              )}
            </div>

            <div className="text-white/50">
              ID: {bookId} • Ep {index + 1}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="section-title text-sm md:text-base">
            Episode Lainnya
          </h2>
          <EpisodeList bookId={bookId} chapters={chapters} />
        </div>
      </section>
    </div>
  );
}
