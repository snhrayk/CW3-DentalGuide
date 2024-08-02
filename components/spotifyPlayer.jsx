import { useEffect, useState } from "react";

export default function SpotifyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tokenAvailable, setTokenAvailable] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (token) {
      setTokenAvailable(true);
    }
  }, []);

  useEffect(() => {
    if (tokenAvailable) {
      const loadSpotifySDK = () => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        script.onload = () => {
          if (typeof window !== "undefined") {
            window.onSpotifyWebPlaybackSDKReady = () => {
              const token = localStorage.getItem("spotifyAccessToken");
              if (!token) {
                console.error("No Spotify access token found");
                return;
              }

              const player = new window.Spotify.Player({
                name: "dental-guide",
                getOAuthToken: (cb) => {
                  cb(token);
                },
              });

              // プレイヤーのイベントリスナーを設定
              player.addListener("ready", ({ device_id }) => {
                console.log("Player is ready");
                localStorage.setItem("spotifyDeviceId", device_id);
              });

              player.addListener("not_ready", ({ device_id }) => {
                console.log("Player is not ready");
              });

              player.connect();
            };
          }
        };
        script.onerror = (err) => {
          console.error("Error loading Spotify SDK script:", err);
        };
        document.body.appendChild(script);
      };

      loadSpotifySDK();
    }
  }, [tokenAvailable]);

  const playRandomTrack = async () => {
    const deviceId = localStorage.getItem("spotifyDeviceId");
    if (!deviceId) {
      console.error("No Spotify device ID found");
      return;
    }

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_ID}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("spotifyAccessToken")}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch playlist tracks");
      return;
    }

    const data = await response.json();
    const tracks = data.items;
    if (tracks.length === 0) {
      console.error("No tracks found in the playlist");
      return;
    }

    const randomTrack =
      tracks[Math.floor(Math.random() * tracks.length)].track.uri;

    const playResponse = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          uris: [randomTrack],
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("spotifyAccessToken")}`,
        },
      }
    );

    if (!playResponse.ok) {
      console.error("Failed to play track");
      return;
    }

    setIsPlaying(true);
  };

  return (
    <div>
      {tokenAvailable ? (
        <button
          onClick={playRandomTrack}
          className="bg-green-500 text-white p-2 rounded"
        >
          {isPlaying ? "Playing" : "Play Random Track"}
        </button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
