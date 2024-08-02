/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET:
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    NEXT_PUBLIC_SPOTIFY_REDIRECT_URI:
      process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
    NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID:
      process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID,
  },
};

export default nextConfig;
