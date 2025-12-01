// app/layout.jsx
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { FaTiktok, FaInstagram } from "react-icons/fa";

export const metadata = {
  title: "DramaIN • Streaming Short Drama",
  description: "Website streaming mini drama menggunakan Dramabox API.",
  icons: {
    icon: "/dramain-logo.png",      // ← pakai file dari folder /public
    shortcut: "/dramain-logo.png",
    apple: "/dramain-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen flex flex-col text-white">
          {/* HEADER BARU: semua di tengah, nav & search selalu muncul */}
          <header className="sticky top-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur">
            <div className="page-container flex flex-col items-center justify-center gap-3 py-3">
              {/* BARIS 1: Logo + nama + menu, semuanya di tengah */}
              <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6 md:justify-center">
                {/* Logo & brand */}
                <Link href="/" className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-2xl overflow-hidden shadow-lg shadow-pink-500/40 bg-black/40">
                    <Image
                      src="/dramain-logo.png"
                      alt="DramaIN"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
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

                {/* NAV: SELALU MUNCUL (HP & DESKTOP) */}
                <nav className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-white/70">
                  <Link href="/" className="hover:text-white">
                    Beranda
                  </Link>
                  <Link href="/classify" className="hover:text-white">
                    Filter &amp; Genre
                  </Link>
                </nav>
              </div>

              {/* BARIS 2: Search bar di tengah, selalu muncul */}
              <form
                action="/search"
                className="w-full max-w-md mx-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs"
              >
                <input
                  name="q"
                  placeholder="Cari judul drama, genre, atau kata kunci..."
                  className="bg-transparent outline-none flex-1 placeholder:text-white/40 text-center md:text-left"
                />
                <button
                  type="submit"
                  className="px-4 py-1 rounded-full bg-pink-600 hover:bg-pink-500 text-[11px] font-medium"
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

          {/* FOOTER (pakai sosmed, sudah diganti username) */}
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
                  href="https://www.tiktok.com/@0xwils"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
                >
                  <FaTiktok className="w-3 h-3" />
                  <span>
                    TIKTOK :{" "}
                    <span className="font-medium text-white">@0xwils</span>
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
