import { useEffect, useState } from "react";
import { fetchDeviceId } from "../utils/spotify";

export default function SpotifyPlayer() {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyAccessToken");
    setToken(storedToken);

    if (storedToken) {
      const fetchTracks = async () => {
        try {
          // プレイリストのトラックを取得する処理
        } catch (error) {
          console.error("Error fetching playlist tracks:", error);
        }
      };

      fetchTracks();
    }
  }, []);

  const playRandomTrack = async () => {
    if (tracks.length > 0 && token) {
      const randomTrack =
        tracks[Math.floor(Math.random() * tracks.length)].track;

      const deviceId = await fetchDeviceId(token); // デバイスIDを取得
      if (deviceId) {
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
    }
  };

  return (
    <div>
      {/* 他のUI */}
      <button onClick={playRandomTrack}>ランダム再生</button>
    </div>
  );
}
