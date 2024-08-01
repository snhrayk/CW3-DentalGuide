// import React from "react";
// import { useRef, useState, useEffect } from "react";
// import axios from "axios";
// import Script from "next/script";

// export default function Spotify() {
//   const [tracks, setTracks] = useState([]);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [accessToken, setAccessToken] = useState("");
//   const playerRef = useRef(null);

//   // Spotify APIからデータを取得
//   useEffect(() => {
//     const fetchTracks = async () => {
//       try {
//         const response = await axios.get("/api/getSpotify");
//         setTracks(response.data.tracks);
//       } catch (error) {
//         console.error("Failed to fetch tracks: ", error);
//       }
//     };

//     const fetchAccessToken = async () => {
//       try {
//         const response = await axios.post("/api/getSpotifyToken");
//         setAccessToken(response.data.access_token);
//       } catch (error) {
//         console.error("Failed to fetch access token: ", error);
//       }
//     };

//     fetchTracks();
//     fetchAccessToken();
//   }, []);

//   useEffect(() => {
//     if (accessToken && tracks.length > 0) {
//       const onSpotifyWebPlaybackSDKReady = () => {
//         const player = new window.Spotify.Player({
//           name: "Web Playback SDK Quick Start Player",
//           getOAuthToken: (cb) => {
//             cb(accessToken);
//           },
//         });

//         player.addListener("ready", ({ device_id }) => {
//           console.log("Ready with Device ID", device_id);
//           playerRef.current = player;

//           playTrack(device_id, tracks[currentTrackIndex].uri);
//         });

//         player.addListener("player_state_changed", (state) => {
//           if (!state) return;

//           if (
//             state.paused &&
//             state.position === 0 &&
//             state.restrictions.disallow_resuming_reasons?.length
//           ) {
//             setCurrentTrackIndex(
//               (prevIndex) => (prevIndex + 1) % tracks.length
//             );
//           }
//         });

//         player.connect();
//       };

//       if (window.Spotify) {
//         onSpotifyWebPlaybackSDKReady();
//       } else {
//         window.onSpotifyWebPlaybackSDKReady = onSpotifyWebPlaybackSDKReady;
//       }
//     }

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.disconnect();
//       }
//     };
//   }, [accessToken, tracks, currentTrackIndex]);

//   useEffect(() => {
//     if (playerRef.current && tracks.length > 0) {
//       const deviceId = playerRef.current._options.id;
//       playTrack(deviceId, tracks[currentTrackIndex].uri);
//     }
//   }, [currentTrackIndex, tracks]);

//   const playTrack = (deviceId, trackUri) => {
//     axios
//       .put(
//         `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
//         {
//           uris: [trackUri],
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .catch((error) => {
//         console.error("Failed to play track:", error);
//       });
//   };

//   return (
//     <>
//       <Script
//         src="https://sdk.scdn.co/spotify-player.js"
//         strategy="afterInteractive"
//       />
//       {tracks.length > 0 && (
//         <div className="w-[1/3] h-full flex flex-col justify-content">
//           <img
//             src={tracks[currentTrackIndex].album.images[0].url}
//             alt={tracks[currentTrackIndex].name}
//             className="w-[9.6rem] aspect-square"
//           />
//           <div className="pl-[1.6rem]">
//             <p className="text-[1.2rem] text-baseColor">
//               {tracks[currentTrackIndex].name}
//             </p>
//             <p className="text-[1.0rem] text-artist">
//               {tracks[currentTrackIndex].artists
//                 .map((artist) => artist.name)
//                 .join(", ")}
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
