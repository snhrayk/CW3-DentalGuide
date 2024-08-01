import { useEffect, useState } from "react";

export default function SpotifyPlayer() {
  const [trackInfo, setTrackInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("spotifyAccessToken");

    if (token) {
      // SDKがロードされてから実行するためのチェック
      const checkSDKLoaded = () => {
        if (typeof window.Spotify === "undefined") {
          console.error("Spotify Web Playback SDK is not loaded.");
          return;
        }

        window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new window.Spotify.Player({
            name: "Web Playback SDK",
            getOAuthToken: (cb) => {
              cb(token);
            },
          });

          player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);

            const playlistId = process.env.SPOTIFY_PLAYLIST_ID;

            // プレイリストのトラックをランダムに再生
            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                  );
                }
                return response.json();
              })
              .then((data) => {
                const tracks = data.items.map((item) => ({
                  uri: item.track.uri,
                  name: item.track.name,
                  artist: item.track.artists[0].name,
                  image: item.track.album.images[0].url,
                }));

                const randomTrack =
                  tracks[Math.floor(Math.random() * tracks.length)];
                player.play({ uris: [randomTrack.uri] });

                // 現在のトラック情報を保存
                setTrackInfo(randomTrack);
              })
              .catch((error) => {
                console.error("Error fetching playlist tracks:", error);
              });
          });

          player.connect();
        };
      };

      checkSDKLoaded();
    }
  }, []);

  return (
    <div className="p-4">
      <div className="text-center text-xl font-bold mb-4">Spotify Player</div>
      {trackInfo && (
        <div className="flex items-center space-x-4">
          <img
            src={trackInfo.image}
            alt={trackInfo.name}
            className="w-24 h-24 rounded-lg shadow-lg"
          />
          <div className="flex flex-col justify-center">
            <p className="text-lg font-semibold">{trackInfo.name}</p>
            <p className="text-md text-gray-600">{trackInfo.artist}</p>
          </div>
        </div>
      )}
    </div>
  );
}
