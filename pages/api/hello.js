// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
  // res.status(200).json({
  //   clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  //   redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  //   playlistId: process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID,
  // });
}
