import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Script from "next/script";
import Image from "next/image";
import guideOne from "../public/img/guide1.svg";
import guideTwo from "../public/img/guide2.svg";
import guideThree from "../public/img/guide3.svg";

export default function BrushingStart() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const requestRef = useRef();
  const startRef = useRef();
  const playerRef = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);

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

  // 天気api

  // タイマーのロジック
  const images = [guideOne, guideTwo, guideThree];

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
      } else {
        setTimeout(() => {
          router.push("/finish");
        }, 2000);
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
      <div className="w-full h-[26dvh] bg-gray-400 rounded-bl-[1.6rem] rounded-br-[1.6rem] shadow-main-shadow">
        <div className="w-full h-auto flex items-center bg-artist backdrop-blur-btn-blur">
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
        </div>
        <div className="w-full flex justify-evenly items-center py-[2.4rem]">
          {/* 音楽 */}
          {tracks.length > 0 && (
            <div className="w-[1/3] h-full flex flex-col justify-content">
              <img
                src={tracks[currentTrackIndex].album.images[0].url}
                alt={tracks[currentTrackIndex].name}
                className="w-[9.6rem] aspect-square"
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
          {/* 天気 */}
          <div className="w-[2/3] h-full text-baseColor">
            <p className="text-[1.6rem] font-semibold ">大阪府大阪市</p>
            <div className="flex items-center gap-x-[2.4rem]">
              <div>
                <p className="text-[6.4rem] font-bold">
                  34
                  <span className="text-[3.2rem]">℃</span>
                </p>
              </div>
              <div>
                <p className="text-[2.4rem]">天気</p>
                <p className="flex text-[1.6rem] gap-x-[.4rem]">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12C21 12.2449 20.91 12.4813 20.7473 12.6644C20.5845 12.8474 20.3603 12.9643 20.117 12.993L20 13H13V18C13.0003 18.2549 13.0979 18.5 13.2728 18.6854C13.4478 18.8707 13.687 18.9822 13.9414 18.9972C14.1958 19.0121 14.4464 18.9293 14.6418 18.7657C14.8373 18.6021 14.9629 18.3701 14.993 18.117L15 18C15 17.7348 15.1054 17.4804 15.2929 17.2929C15.4804 17.1054 15.7348 17 16 17C16.2652 17 16.5196 17.1054 16.7071 17.2929C16.8946 17.4804 17 17.7348 17 18C17.0008 18.7809 16.697 19.5313 16.1532 20.0918C15.6095 20.6523 14.8686 20.9787 14.088 21.0016C13.3075 21.0245 12.5487 20.7422 11.973 20.2145C11.3973 19.6869 11.0501 18.9556 11.005 18.176L11 18V13H4C3.75507 13 3.51866 12.91 3.33563 12.7473C3.15259 12.5845 3.03566 12.3602 3.007 12.117L3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  30%
                </p>
              </div>
            </div>
          </div>
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
          {/* <image
            xlinkHref={images[imageIndex]}
            x="15"
            y="15"
            width="250"
            height="250"
          /> */}
        </svg>
        <div className="timerText mt-[3.2rem] text-[4.8rem] font-semibold"></div>
      </div>
    </>
  );
}
