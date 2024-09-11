// pages/index.jsx
import { useEffect, useState } from "react";
import { initializeSpotifyPlayer, fetchPlaylistTracks } from "../utils/spotify";

export default function Home() {
  const [token, setToken] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyAccessToken");
    if (storedToken) {
      setToken(storedToken);
      initializeSpotifyPlayer(storedToken, setDeviceId); // プレーヤーの初期化
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchTracks = async () => {
        try {
          const playlistTracks = await fetchPlaylistTracks(
            token,
            process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID
          );
          setTracks(playlistTracks);
        } catch (error) {
          console.error("Error fetching playlist tracks:", error);
        }
      };
      fetchTracks();
    }
  }, [token]);

  const playTrack = async () => {
    if (tracks.length > 0 && deviceId && token) {
      const randomTrack =
        tracks[Math.floor(Math.random() * tracks.length)].track;

      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            uris: [randomTrack.uri],
          }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  return (
    <div>
      {token ? (
        <p>アクセストークンが取得されました！</p>
      ) : (
        <p>アクセストークンがありません。</p>
      )}
      <button onClick={playTrack}>ランダム再生</button>
    </div>
  );
}
