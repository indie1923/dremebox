// components/DramaCard.jsx
import Link from "next/link";
import Image from "next/image";

export default function DramaCard({ drama }) {
  const {
    bookId,
    bookName,
    introduction,
    cover,
    chapterCount,
    playCount,
    tags,
    corner,
  } = drama;

  const title = bookName || "Tanpa Judul";

  return (
    <Link
      href={`/drama/${bookId}`}
      className="group bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-pink-500/70 hover:bg-white/10 hover:-translate-y-1.5 transition-all duration-200 flex flex-col shadow-sm hover:shadow-pink-500/30"
    >
      <div className="relative w-full aspect-[2/3] bg-black/40 overflow-hidden">
        {cover && (
          <Image
            src={cover}
            alt={title}
            fill
            sizes="200px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Badge pojok (Terbaru / Eksklusif) */}
        {corner?.name && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-medium shadow-sm"
            style={{
              backgroundColor: corner.color || "rgba(0,0,0,0.7)",
            }}
          >
            {corner.name}
          </span>
        )}

        {/* Info episode & views */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] md:text-[11px]">
          <span className="px-2 py-0.5 rounded-full bg-black/80 border border-white/15">
            {chapterCount ? `${chapterCount} Ep` : "Drama"}
          </span>
          {playCount && (
            <span className="px-2 py-0.5 rounded-full bg-black/80 border border-white/15">
              {playCount} tayang
            </span>
          )}
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col gap-1.5">
        <h3 className="text-[13px] md:text-sm font-semibold line-clamp-2 group-hover:text-pink-400">
          {title}
        </h3>

        {introduction && (
          <p className="text-[11px] text-white/60 line-clamp-2">
            {introduction}
          </p>
        )}

        {Array.isArray(tags) && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
