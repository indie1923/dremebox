// app/drama/[bookId]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { getChapters } from "@/lib/api";
import EpisodeList from "@/components/EpisodeList";

export const dynamic = "force-dynamic";

export default async function DramaDetailPage({ params }) {
  const { bookId } = params;

  let info = null;
  let chapters = [];

  try {
    const data = await getChapters(bookId);
    info = data.info || null;
    chapters = data.chapters || [];
  } catch (err) {
    console.error("Error getChapters:", err);
  }

  const title =
    info?.bookName ||
    info?.title ||
    info?.name ||
    `Drama ${bookId}`;

  const cover =
    info?.cover ||
    info?.verticalCover ||
    info?.poster ||
    info?.image;

  const intro =
    info?.introduction ||
    info?.brief ||
    info?.description ||
    info?.detail;

  const tags =
    Array.isArray(info?.tags) && info.tags.length
      ? info.tags
      : Array.isArray(info?.tagList)
      ? info.tagList
      : [];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* BREADCRUMB */}
      <div className="text-[11px] md:text-xs text-white/60 flex items-center gap-1">
        <Link href="/" className="hover:text-white">
          Beranda
        </Link>
        <span>/</span>
        <span className="text-white/70 line-clamp-1 max-w-[60%]">
          {title}
        </span>
      </div>

      {/* HEADER DRAMA */}
      <section className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6 md:gap-8 items-start">
        <div className="w-full max-w-[240px]">
          <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-lg shadow-black/40">
            {cover && (
              <Image
                src={cover}
                alt={title}
                fill
                sizes="240px"
                className="object-cover"
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h1>

          {intro && (
            <p className="text-sm md:text-base text-white/70 whitespace-pre-line">
              {intro}
            </p>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 8).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] md:text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 text-[11px] md:text-xs text-white/70">
            {info?.chapterCount && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {info.chapterCount} episode
              </span>
            )}
            {info?.playCount && (
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {info.playCount} tayang
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {chapters.length > 0 && (
              <Link
                href={`/watch/${bookId}/0`}
                className="px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-xs md:text-sm font-medium shadow-lg shadow-pink-500/40"
              >
                ▶ Tonton dari Episode 1
              </Link>
            )}
            <Link
              href="/"
              className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs md:text-sm"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </section>

      {/* LIST EPISODE */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="section-title text-base md:text-lg">
            Daftar Episode
          </h2>
          {chapters.length > 0 && (
            <span className="text-[11px] md:text-xs text-white/60">
              Total {chapters.length} episode
            </span>
          )}
        </div>
        <EpisodeList bookId={bookId} chapters={chapters} />
      </section>
    </div>
  );
}
