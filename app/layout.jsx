// app/layout.jsx
import "./globals.css";
import Link from "next/link";
import Image from "next/image";          // ⬅️ sudah benar
import { FaTiktok, FaInstagram } from "react-icons/fa"; // ikon sosmed

export const metadata = {
  title: "DramaIN • Streaming Short Drama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen flex flex-col text-white">
          {/* HEADER */}
          <header className="sticky top-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur">
            <div className="page-container flex items-center justify-between gap-4 py-3">
              {/* Kiri: Logo + Nav */}
              <div className="flex items-center gap-6">
                {/* Logo & brand */}
                <Link href="/" className="flex items-center gap-3">
                  {/* Logo gambar */}
                  <div className="relative w-9 h-9 rounded-2xl overflow-hidden shadow-lg shadow-pink-500/40 bg-black/40">
                    <Image
                      src="/dramain-logo.png"   // ⬅️ pastikan file ini ada di /public
                      alt="DramaIN"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Teks brand */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold text-base md:text-lg tracking-tight">
                        DramaIN
                      </h1>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
                        Beta
                      </span>
                    </div>
                    <p className="text-[11px] text-white/60">
                       • Short drama streaming •
                    </p>
                  </div>
                </Link>

                {/* Nav kecil */}
                <nav className="hidden md:flex items-center gap-3 text-[11px] text-white/70">
                  <Link href="/" className="hover:text-white">
                    Beranda
                  </Link>
                  <Link href="/classify" className="hover:text-white">
                    Filter &amp; Genre
                  </Link>
                </nav>
              </div>

              {/* Kanan: Search bar */}
              <form
                action="/search"
                className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs w-full max-w-xs"
              >
                <input
                  name="q"
                  placeholder="Cari judul drama, genre, atau kata kunci..."
                  className="bg-transparent outline-none flex-1 placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded-full bg-pink-600 hover:bg-pink-500 text-[11px] font-medium"
                >
                  Cari
                </button>
              </form>
            </div>
          </header>

          {/* MAIN */}
          <main className="flex-1 py-4 md:py-6">
            <div className="page-container space-y-8 md:space-y-10">
              {children}
            </div>
          </main>

          {/* FOOTER (baru, pakai sosmed) */}
          <footer className="border-t border-white/10 py-4 text-xs text-white/60 bg-black/60 backdrop-blur">
            <div className="page-container flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                © {new Date().getFullYear()}{" "}
                <span className="font-medium text-white">DramaIN</span> ·
                Dibuat dengan ❤️ oleh EhWill
              </div>

              {/* SOSMED */}
              <div className="flex items-center gap-3 text-[11px]">
                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@pbyeah"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  <FaTiktok className="w-3 h-3" />
                  <span>
                    TIKTOK :{" "}
                    <span className="font-medium text-white">@pbyeah</span>
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/wildanamran"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  <FaInstagram className="w-3 h-3" />
                  <span>
                    INSTAGRAM :{" "}
                    <span className="font-medium text-white">
                      @wildanamran
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
