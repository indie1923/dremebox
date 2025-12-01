// components/PaginationSimple.jsx
import Link from "next/link";

export default function PaginationSimple({
  page,
  pageSize,
  itemCount,
  hasMore,
  total,
  makeHref,
}) {
  const currentPage = page || 1;
  const size = pageSize || itemCount || 10;

  // Kalau bener-bener nggak ada data & nggak ada page lain
  if (!itemCount && !hasMore && currentPage <= 1) return null;

  const startIndex = (currentPage - 1) * size + 1;
  const endIndex = startIndex + Math.max(itemCount - 1, 0);

  // Hitung total item & total halaman (kalau API ngasih "total")
  let totalItems = total;
  if (!totalItems && !hasMore) {
    // kalau API nggak kasih total tapi sudah di page terakhir
    totalItems = endIndex;
  }

  const totalPages = totalItems
    ? Math.max(1, Math.ceil(totalItems / size))
    : hasMore
    ? currentPage + 1 // kira-kira masih ada 1 page lagi
    : currentPage;

  const maxButtons = 5; // banyak tombol nomor yang kelihatan sekaligus
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  startPage = Math.max(1, endPage - maxButtons + 1);

  const pages = [];
  for (let p = startPage; p <= endPage; p++) {
    pages.push(p);
  }

  const buildHref = (p) =>
    makeHref ? makeHref(p) : `/?page=${p}&pageSize=${size}`;

  const prevDisabled = currentPage <= 1;
  const nextDisabled = !hasMore && currentPage >= totalPages;

  return (
    <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm card-surface px-4 py-3">
      <div className="text-white/70">
        Menampilkan{" "}
        {itemCount > 0 ? (
          <>
            <span className="font-medium text-white">
              {startIndex}–{endIndex}
            </span>
            {totalItems ? (
              <>
                {" "}
                dari{" "}
                <span className="font-medium text-white">
                  {totalItems}
                </span>{" "}
                data
              </>
            ) : null}{" "}
            (Page{" "}
            <span className="font-medium text-white">{currentPage}</span>)
          </>
        ) : (
          "0 data"
        )}
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        {/* Prev */}
        <Link
          href={buildHref(Math.max(1, currentPage - 1))}
          aria-disabled={prevDisabled}
          className={`px-3 py-1.5 rounded-full border border-white/15 text-[11px] md:text-xs ${
            prevDisabled ? "opacity-40 pointer-events-none" : "hover:bg-white/10"
          }`}
        >
          ← Prev
        </Link>

        {/* Kalau startPage > 1, tampilkan tombol 1 + ... */}
        {startPage > 1 && (
          <>
            <Link
              href={buildHref(1)}
              className={`px-3 py-1.5 rounded-full border border-white/15 text-[11px] md:text-xs hover:bg-white/10 ${
                currentPage === 1 ? "bg-pink-600 border-pink-500 text-white" : ""
              }`}
            >
              1
            </Link>
            {startPage > 2 && (
              <span className="px-1 text-white/50">…</span>
            )}
          </>
        )}

        {/* Nomor halaman di tengah */}
        {pages.map((p) => (
          <Link
            key={p}
            href={buildHref(p)}
            className={`px-3 py-1.5 rounded-full border text-[11px] md:text-xs ${
              p === currentPage
                ? "bg-pink-600 border-pink-500 text-white"
                : "border-white/15 hover:bg-white/10"
            }`}
          >
            {p}
          </Link>
        ))}

        {/* Kalau endPage < totalPages, tampilkan ... + last page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-1 text-white/50">…</span>
            )}
            <Link
              href={buildHref(totalPages)}
              className={`px-3 py-1.5 rounded-full border border-white/15 text-[11px] md:text-xs hover:bg-white/10 ${
                currentPage === totalPages
                  ? "bg-pink-600 border-pink-500 text-white"
                  : ""
              }`}
            >
              {totalPages}
            </Link>
          </>
        )}

        {/* Next */}
        <Link
          href={buildHref(currentPage + 1)}
          aria-disabled={nextDisabled}
          className={`px-3 py-1.5 rounded-full border border-white/15 text-[11px] md:text-xs ${
            nextDisabled ? "opacity-40 pointer-events-none" : "hover:bg-white/10"
          }`}
        >
          Next →
        </Link>
      </div>
    </div>
  );
}
