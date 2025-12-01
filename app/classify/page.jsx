// app/classify/page.jsx
import DramaCard from "@/components/DramaCard";
import PaginationSimple from "@/components/PaginationSimple";
import { classify } from "@/lib/api";

export const dynamic = "force-dynamic";

// ❗ Silakan ganti ID genre & label sesuai API / selera lu
const GENRE_OPTIONS = [
  { id: "", label: "Semua Genre" },
  { id: "1357", label: "Romance / CEO" },
  { id: "1001", label: "Fantasi" },
  { id: "1002", label: "Action" },
  { id: "1003", label: "Komedi" },
];

const SORT_OPTIONS = [
  { id: 1, label: "Rekomendasi" },
  { id: 2, label: "Terbaru" },
  { id: 3, label: "Terpopuler" },
];

export default async function ClassifyPage({ searchParams }) {
  const genre = (searchParams?.genre ?? "").toString();
  const sort = Number(searchParams?.sort) || 1;
  const pageNo = Number(searchParams?.pageNo) || 1;

  let result = { items: [], isMore: false, total: 0 };

  try {
    result = await classify({
      pageNo,
      // kalau genre kosong, jangan dikirim (biar "semua")
      genre: genre || undefined,
      sort,
    });
  } catch (err) {
    console.error("Error classify:", err);
  }

  const items = result.items || [];
  const itemCount = items.length;
  const hasMore = Boolean(result.isMore);
  const pageSize = itemCount || 12; // buat info "menampilkan X–Y"

  const currentGenre = GENRE_OPTIONS.find((g) => g.id === genre) || GENRE_OPTIONS[0];
  const currentSort = SORT_OPTIONS.find((s) => s.id === sort) || SORT_OPTIONS[0];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header & filter bar */}
      <section className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="section-title">Filter & Klasifikasi Drama</h1>
            <p className="section-subtitle">
              Pilih genre dan urutan untuk menemukan drama yang cocok buat kamu.
            </p>
          </div>

          {/* Form filter */}
          <form
            action="/classify"
            className="card-surface px-3 py-2 text-xs md:text-sm flex flex-wrap items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-white/60">Genre</span>
              <select
                name="genre"
                defaultValue={genre}
                className="bg-black/60 border border-white/20 rounded-lg px-2 py-1 text-xs"
              >
                {GENRE_OPTIONS.map((g) => (
                  <option key={g.id || "all"} value={g.id}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/60">Urutkan</span>
              <select
                name="sort"
                defaultValue={sort}
                className="bg-black/60 border border-white/20 rounded-lg px-2 py-1 text-xs"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* reset page ke 1 tiap ganti filter */}
            <input type="hidden" name="pageNo" value="1" />

            <button
              type="submit"
              className="ml-auto px-3 py-1 rounded-lg border border-white/20 hover:bg-white/10"
            >
              Terapkan
            </button>
          </form>
        </div>

        {/* Info filter aktif */}
        <div className="text-[11px] md:text-xs text-white/60">
          Genre:{" "}
          <span className="text-white font-medium">{currentGenre.label}</span>{" "}
          • Urutkan:{" "}
          <span className="text-white font-medium">{currentSort.label}</span>{" "}
          • Page {pageNo}
        </div>
      </section>

      {/* Hasil list */}
      <section className="space-y-4">
        {itemCount === 0 ? (
          <p className="text-sm text-white/60">
            Tidak ada drama yang cocok dengan filter saat ini. Coba ganti genre
            atau urutan.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              {items.map((drama) => (
                <DramaCard key={drama.bookId} drama={drama} />
              ))}
            </div>

            <PaginationSimple
              page={pageNo}
              pageSize={pageSize}
              itemCount={itemCount}
              hasMore={hasMore}
              makeHref={(p) =>
                `/classify?genre=${encodeURIComponent(
                  genre
                )}&sort=${sort}&pageNo=${p}`
              }
            />
          </>
        )}
      </section>
    </div>
  );
}
