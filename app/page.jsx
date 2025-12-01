// app/page.jsx
import Image from "next/image";
import DramaCard from "@/components/DramaCard";
import PaginationSimple from "@/components/PaginationSimple";
import { getForYou, getNewList, getRank } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 12;

  let forYou = { items: [] };
  let newList = { items: [], isMore: false, total: 0 };
  let rank = { items: [] };

  try {
    [forYou, newList, rank] = await Promise.all([
      getForYou(1),
      getNewList(page, pageSize),
      getRank(1),
    ]);
  } catch (err) {
    console.error("Error load homepage:", err);
  }

  const hero = forYou.items?.[0] || null;
  const moreForYou = hero ? forYou.items.slice(1, 10) : forYou.items || [];

  const newItems = newList.items || [];
  const hasMore = Boolean(newList.isMore);
  const itemCount = newItems.length;

  return (
    <div className="space-y-10 md:space-y-12">
      {/* HERO */}
      {hero && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          <div className="space-y-4 md:space-y-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-pink-300/80">
              Drama rekomendasi hari ini
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {hero.bookName}
            </h2>
            {hero.introduction && (
              <p className="text-sm md:text-base text-white/70 line-clamp-4">
                {hero.introduction}
              </p>
            )}
            <div className="flex flex-wrap gap-2 text-[11px] md:text-xs text-white/70">
              {hero.chapterCount && (
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {hero.chapterCount} episode
                </span>
              )}
              {hero.playCount && (
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {hero.playCount} tayang
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`/watch/${hero.bookId}/0`}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-xs md:text-sm font-medium shadow-lg shadow-pink-500/40"
              >
                ▶ Tonton Episode 1
              </a>
              <a
                href={`/drama/${hero.bookId}`}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-xs md:text-sm"
              >
                Detail Drama
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="card-surface overflow-hidden h-full flex items-stretch">
              <div className="relative w-full aspect-[16/10] md:aspect-auto md:h-full">
                {hero.cover && (
                  <Image
                    src={hero.cover}
                    alt={hero.bookName}
                    fill
                    sizes="(min-width: 768px) 480px, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOR YOU HORIZONTAL */}
      {moreForYou.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="section-title">Untuk Kamu 🔥</h3>
              <p className="section-subtitle">
                Rekomendasi drama pilihan berdasarkan tren di Dramabox.
              </p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-thin">
            {moreForYou.map((drama) => (
              <div
                key={drama.bookId}
                className="min-w-[150px] max-w-[160px] flex-shrink-0"
              >
                <DramaCard drama={drama} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RILIS TERBARU */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h3 className="section-title">Rilis Terbaru</h3>
            <p className="section-subtitle">
              Drama yang baru saja tayang. Page {page}.
            </p>
          </div>

          <form
            action="/"
            className="flex items-center gap-2 text-xs md:text-sm"
          >
            <span className="text-white/60">Show</span>
            <select
              name="pageSize"
              defaultValue={pageSize}
              className="bg-black/60 border border-white/20 rounded-lg px-2 py-1 text-xs"
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </select>
            <input type="hidden" name="page" value="1" />
            <button
              type="submit"
              className="px-3 py-1 rounded-lg border border-white/20 hover:bg-white/10 text-xs"
            >
              Apply
            </button>
          </form>
        </div>

        {itemCount === 0 ? (
          <div className="mt-6 text-center text-sm text-white/60">
            Tidak ada data yang bisa ditampilkan.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              {newItems.map((drama) => (
                <DramaCard key={drama.bookId} drama={drama} />
              ))}
            </div>

            <PaginationSimple
              page={page}
              pageSize={pageSize}
              itemCount={itemCount}
              hasMore={hasMore}
              total={totalItems}
              makeHref={(p) => `/?page=${p}&pageSize=${pageSize}`}
            />
          </>
        )}
      </section>

      {/* PERINGKAT POPULER */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="section-title">Peringkat Populer ⭐</h3>
            <p className="section-subtitle">
              Drama dengan penayangan tertinggi saat ini.
            </p>
          </div>
        </div>

        {rank.items?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {rank.items.slice(0, 10).map((drama) => (
              <DramaCard key={drama.bookId} drama={drama} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-white/50">
            Peringkat populer belum bisa dimuat.
          </p>
        )}
      </section>
    </div>
  );
}
