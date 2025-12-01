/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // izinkan load gambar dari mana aja (biar aman buat cover dramabox)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
