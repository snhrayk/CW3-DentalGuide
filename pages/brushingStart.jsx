import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Script from "next/script";

export default function BrushingStart() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const requestRef = useRef();
  const startRef = useRef();
  const playerRef = useRef(null);

  const handleBackPage = () => {
    router.push("/brushingtime");
  };

  // Spotify APIからデータを取得
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get("/api/getSpotify");
        setTracks(response.data.tracks);
      } catch (error) {
        console.error("Failed to fetch tracks: ", error);
      }
    };

    const fetchAccessToken = async () => {
      try {
        const response = await axios.post("/api/getSpotifyToken");
        setAccessToken(response.data.access_token);
      } catch (error) {
        console.error("Failed to fetch access token: ", error);
      }
    };

    fetchTracks();
    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken && tracks.length > 0) {
      const onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Web Playback SDK Quick Start Player",
          getOAuthToken: (cb) => {
            cb(accessToken);
          },
        });

        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          playerRef.current = player;

          playTrack(device_id, tracks[currentTrackIndex].uri);
        });

        player.addListener("player_state_changed", (state) => {
          if (!state) return;

          if (
            state.paused &&
            state.position === 0 &&
            state.restrictions.disallow_resuming_reasons?.length
          ) {
            setCurrentTrackIndex(
              (prevIndex) => (prevIndex + 1) % tracks.length
            );
          }
        });

        player.connect();
      };

      if (window.Spotify) {
        onSpotifyWebPlaybackSDKReady();
      } else {
        window.onSpotifyWebPlaybackSDKReady = onSpotifyWebPlaybackSDKReady;
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
    };
  }, [accessToken, tracks, currentTrackIndex]);

  useEffect(() => {
    if (playerRef.current && tracks.length > 0) {
      const deviceId = playerRef.current._options.id;
      playTrack(deviceId, tracks[currentTrackIndex].uri);
    }
  }, [currentTrackIndex, tracks]);

  const playTrack = (deviceId, trackUri) => {
    axios
      .put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          uris: [trackUri],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .catch((error) => {
        console.error("Failed to play track:", error);
      });
  };

  // タイマーのロジック
  useEffect(() => {
    const total = 30;
    const circumference = 2 * Math.PI * 135;
    const circle = document.querySelector(".circle");
    const timerText = document.querySelector(".timerText");

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = 0;

    const animate = (time) => {
      if (!startRef.current) startRef.current = time;
      const elapsed = time - startRef.current;
      const remaining = Math.max(total * 1000 - elapsed, 0);
      const now = Math.ceil(remaining / 1000);

      const minutes = String(Math.floor(now / 60)).padStart(2, "0");
      const seconds = String(now % 60).padStart(2, "0");

      circle.style.strokeDashoffset =
        (elapsed / (total * 1000)) * circumference;
      timerText.textContent = now > 0 ? `${minutes}:${seconds}` : "終了!!!";
      setTimeLeft(now);

      if (remaining > 0) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <>
      <Script
        src="https://sdk.scdn.co/spotify-player.js"
        strategy="afterInteractive"
      />
      <div className="w-full h-[28dvh] bg-main rounded-bl-[1.6rem] rounded-br-[1.6rem] shadow-main-shadow">
        <div className="w-full h-auto flex items-center bg-gray-600">
          <button
            onClick={handleBackPage}
            className="w-[4.8rem] aspect-square pl-[0.8rem]"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L13.4142 16L20.7071 23.2929C21.0976 23.6834 21.0976 24.3166 20.7071 24.7071C20.3166 25.0976 19.6834 25.0976 19.2929 24.7071L11.2929 16.7071C10.9024 16.3166 10.9024 15.6834 11.2929 15.2929L19.2929 7.29289C19.6834 6.90237 20.3166 6.90237 20.7071 7.29289Z"
                fill="white"
              />
            </svg>
          </button>
          {/* 現在のトラックを表示 */}
          {tracks.length > 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <img
                src={tracks[currentTrackIndex].album.images[0].url}
                alt={tracks[currentTrackIndex].name}
                className="w-[3.6rem] aspect-square"
              />
              <div className="pl-[1.6rem]">
                <p className="text-[1.2rem] text-baseColor">
                  {tracks[currentTrackIndex].name}
                </p>
                <p className="text-[1.0rem] text-artist">
                  {tracks[currentTrackIndex].artists
                    .map((artist) => artist.name)
                    .join(", ")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        id="countDown"
        className="w-full flex flex-col justify-center items-center py-4 mt-[2.4rem]"
      >
        <svg className="w-full max-w-[350px] h-auto" viewBox="0 0 300 300">
          <circle
            className="circle"
            r="135"
            cx="150"
            cy="150"
            fill="transparent"
            stroke="#90C9EA"
            strokeWidth="24"
            transform="rotate(-90 150 150)"
          />
        </svg>
        <div className="timerText mt-[3.2rem] text-[4.8rem] font-semibold"></div>
      </div>
    </>
  );
}
