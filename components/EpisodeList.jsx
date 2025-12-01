// components/EpisodeList.jsx
import Link from "next/link";

export default function EpisodeList({ bookId, chapters }) {
  if (!chapters || chapters.length === 0) {
    return (
      <p className="text-sm text-white/60">
        Episode belum tersedia atau gagal mengambil data.
      </p>
    );
  }

  return (
    <div className="card-surface p-3 md:p-4 space-y-2 max-h-[480px] overflow-y-auto scrollbar-thin">
      {chapters.map((ch, idx) => {
        const index =
          ch.chapterIndex ?? ch.index ?? ch.chapter ?? ch.episodeIndex ?? idx;
        const title =
          ch.chapterName ||
          ch.name ||
          ch.title ||
          `Episode ${index + 1}`;

        const locked =
          ch.isUnlocked === false ||
          ch.unlockType === 2 ||
          ch.vip === true ||
          ch.isPay === true;

        return (
          <Link
            key={index}
            href={`/watch/${bookId}/${index}`}
            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs md:text-sm transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] px-2 py-1 rounded-lg bg-black/40 border border-white/15">
                Ep {index + 1}
              </span>
              <span className="font-medium line-clamp-1">{title}</span>
            </div>
            <div
              className={`text-[11px] ${
                locked ? "text-amber-300" : "text-emerald-300"
              }`}
            >
              {locked ? "Premium" : "Gratis"}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
