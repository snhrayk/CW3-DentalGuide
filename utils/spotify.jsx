// utils/spotify.js
export const fetchDeviceId = async (token) => {
  try {
    if (!token) throw new Error("No token found");

    const response = await fetch(
      "https://api.spotify.com/v1/me/player/devices",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch devices");

    const data = await response.json();
    const macbookDevice = data.devices.find((device) =>
      device.name.includes("MacBook")
    );
    return macbookDevice ? macbookDevice.id : null;
  } catch (error) {
    console.error("Error fetching devices:", error);
    return null;
  }
};

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

// デバイスIDを取得するためのSpotify Web Playback SDKの初期化
export const initializeSpotifyPlayer = (token) => {
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: "Web Playback SDK",
      getOAuthToken: (cb) => {
        cb(token);
      },
    });

    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      // デバイスIDを保存または使用する
    });

    player.connect();
  };
};
