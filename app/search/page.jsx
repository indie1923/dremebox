// app/search/page.jsx
import DramaCard from "@/components/DramaCard";
import PaginationSimple from "@/components/PaginationSimple";
import { searchDrama } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }) {
  const q = (searchParams?.q || "").trim();
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 12;

  if (!q) {
    return (
      <div className="space-y-4">
        <h1 className="section-title">Pencarian Drama</h1>
        <p className="section-subtitle">
          Ketik judul atau kata kunci drama di kolom pencarian (pojok kanan
          atas), lalu tekan Enter.
        </p>
      </div>
    );
  }

  let result = { items: [], isMore: false, total: 0 };

  try {
    result = await searchDrama(q, page);
  } catch (err) {
    console.error("Error searchDrama:", err);
  }

  const items = result.items || [];
  const itemCount = items.length;
  const hasMore = Boolean(result.isMore);
  const totalItems = result.total;

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="space-y-1">
        <h1 className="section-title">
          Hasil untuk{" "}
          <span className="text-pink-400 font-semibold">"{q}"</span>
        </h1>
        <p className="section-subtitle">
          Menampilkan {itemCount} drama • page {page}
        </p>
      </section>

      {itemCount === 0 ? (
        <p className="text-sm text-white/60">
          Tidak ditemukan drama untuk kata kunci tersebut.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
            {items.map((drama) => (
              <DramaCard key={drama.bookId} drama={drama} />
            ))}
          </div>

          <PaginationSimple
            page={page}
            pageSize={pageSize}
            itemCount={itemCount}
            hasMore={hasMore}
            total={totalItems}
            makeHref={(p) =>
              `/search?q=${encodeURIComponent(q)}&page=${p}&pageSize=${pageSize}`
            }
          />
        </>
      )}
    </div>
  );
}
