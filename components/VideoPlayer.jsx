// components/VideoPlayer.jsx
export default function VideoPlayer({ src, title }) {
  if (!src) {
    return (
      <div className="card-surface p-4 md:p-5 text-sm border-red-500/40 bg-red-500/10">
        <p className="font-medium text-red-200 mb-1">
          Gagal memuat video episode.
        </p>
        <p className="text-xs text-red-100/80">
          Coba reload halaman, atau cek kembali response dari endpoint{" "}
          <code className="font-mono">/watch</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="card-surface overflow-hidden">
      <div className="bg-black">
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="w-full h-auto max-h-[70vh] bg-black"
        >
          Browser kamu tidak mendukung pemutar video HTML5.
        </video>
      </div>
      {title && (
        <div className="px-4 py-2 border-t border-white/10 text-[11px] md:text-xs text-white/70">
          {title}
        </div>
      )}
    </div>
  );
}
