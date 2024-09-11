// utils/spotify.js

export const fetchPlaylistTracks = async (token, playlistId) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlist tracks");
  }

  const data = await response.json();
  return data.items; // トラックのリストを返す
};

// Spotify Web Playback SDKの初期化
export const initializeSpotifyPlayer = (token, setDeviceId) => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: "Web Playback SDK",
      getOAuthToken: (cb) => {
        cb(token);
      },
    });

    // プレイヤーのリスナーを設定
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      setDeviceId(device_id); // デバイスIDを保存
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error("Failed to initialize", message);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.error("Failed to authenticate", message);
    });

    player.addListener("account_error", ({ message }) => {
      console.error("Account issue", message);
    });

    player.addListener("playback_error", ({ message }) => {
      console.error("Playback error", message);
    });

    player.connect(); // プレーヤーを接続
  };

  // Spotify Web Playback SDKが読み込まれていない場合のエラーハンドリング
  if (!window.Spotify) {
    console.error("Spotify Web Playback SDK could not be loaded");
  }
};
