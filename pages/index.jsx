import Footer from "@/components/footer";
import Image from "next/image";
import calender from "../public/img/calendar.svg";
import clinic from "../public/img/clinic.svg";
import present from "../public/img/present.svg";
import trivia from "../public/img/trivia.svg";
import settings from "../public/img/settings.svg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const formatDate = (date) => {
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = days[date.getDay()];
    return `${year}.${month}.${day} (${dayOfWeek})`;
  };

  const today = new Date();
  const formattedDate = formatDate(today);

  const router = useRouter();
  const handleTrivia = () => {
    router.push("/trivia");
  };
  console.log("handleTrivia");

  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const scopes = [
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "playlist-read-private",
    ].join(" ");

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("spotifyAccessToken");
      if (token) {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          console.log("Forbidden: You do not have the necessary permissions.");
        } else if (!response.ok) {
          console.log("An error occurred:", response.statusText);
        } else {
          const data = await response.json();
          setUserInfo(data);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="w-full h-[88dvh] px-[16px] pt-[16px]">
        {/* 日付とアイコン */}
        <div className="flex justify-between mb-[1.6rem]">
          <h1 className="text-[4rem] font-extrabold">
            {formattedDate.split(" ")[0]}
            <span className="text-[2.4rem]">{formattedDate.split(" ")[1]}</span>
          </h1>
          <button
            onClick={handleLogin}
            className="w-[5.6rem] h-[5.6rem] rounded-[50%] bg-account-icon bg-cover"
          ></button>
          {/* {userInfo && (
            // <div>
            //   <h1>Welcome, {userInfo.display_name}</h1>
            // </div>
          )} */}
        </div>
        {/* 持続日数 */}
        <div className="w-full h-auto py-[1.6rem] mb-[3.2rem] flex justify-evenly bg-home-gradient shadow-main-shadow rounded-[24px]">
          <div
            className="radial-progress"
            style={{
              "--value": "100 / 3",
              "--size": "16rem",
              "--thickness": "3rem",
            }}
            role="progressbar"
          >
            <p className="text-[3.2rem] font-bold">
              1<span className="text-[2.4rem] font-medium">/</span>3
              <span className="text-[2.4rem] font-medium">回</span>
            </p>
          </div>
          {/* 今日何回磨いたか */}
          <div className="w-1/2 flex flex-col justify-center items-center">
            <p className="flex items-center gap-x-[.8rem] text-[4rem] font-bold">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="29"
                  viewBox="0 0 28 29"
                  fill="none"
                >
                  <path
                    d="M0.666992 17.3333C0.666992 14.1945 1.59755 11.1806 3.45866 8.29168C5.31977 5.40279 7.87533 2.87501 11.1253 0.708342C11.7364 0.291675 12.3684 0.270842 13.0212 0.645842C13.6739 1.02084 14.0003 1.58334 14.0003 2.33334V4.50001C14.0003 5.44445 14.3267 6.23612 14.9795 6.87501C15.6323 7.5139 16.4309 7.83334 17.3753 7.83334C17.8475 7.83334 18.2989 7.72918 18.7295 7.52084C19.16 7.31251 19.542 7.0139 19.8753 6.62501C20.0975 6.34723 20.3823 6.17362 20.7295 6.10418C21.0767 6.03473 21.4031 6.11112 21.7087 6.33334C23.4587 7.58334 24.8337 9.18056 25.8337 11.125C26.8337 13.0695 27.3337 15.1389 27.3337 17.3333C27.3337 19.7778 26.7364 22.007 25.542 24.0208C24.3475 26.0347 22.7781 27.625 20.8337 28.7917C21.3059 28.125 21.6739 27.3958 21.9378 26.6042C22.2017 25.8125 22.3337 24.9722 22.3337 24.0833C22.3337 22.9722 22.1253 21.9236 21.7087 20.9375C21.292 19.9514 20.6948 19.0695 19.917 18.2917L14.0003 12.5L8.12533 18.2917C7.31977 19.0972 6.70866 19.9861 6.29199 20.9583C5.87533 21.9306 5.66699 22.9722 5.66699 24.0833C5.66699 24.9722 5.79894 25.8125 6.06283 26.6042C6.32671 27.3958 6.69477 28.125 7.16699 28.7917C5.22255 27.625 3.6531 26.0347 2.45866 24.0208C1.26421 22.007 0.666992 19.7778 0.666992 17.3333ZM14.0003 17.1667L17.542 20.625C18.0142 21.0972 18.3753 21.625 18.6253 22.2083C18.8753 22.7917 19.0003 23.4167 19.0003 24.0833C19.0003 25.4445 18.5142 26.6042 17.542 27.5625C16.5698 28.5208 15.3892 29 14.0003 29C12.6114 29 11.4309 28.5208 10.4587 27.5625C9.48644 26.6042 9.00033 25.4445 9.00033 24.0833C9.00033 23.4445 9.12533 22.8264 9.37533 22.2292C9.62533 21.632 9.98644 21.0972 10.4587 20.625L14.0003 17.1667Z"
                    fill="url(#paint0_linear_513_3759)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_513_3759"
                      x1="14.0003"
                      y1="0.379395"
                      x2="14.0003"
                      y2="29"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#F58445" />
                      <stop offset="1" stop-color="#F54545" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              27
            </p>
            {/* 何日続けられたか */}
            <p className="text-[1.6rem] text-center">
              そろそろ歯ブラシの
              <br />
              交換時期です
            </p>
          </div>
        </div>
        <div className="w-full mb-[2.4rem]">
          <h2 className="text-[1.6rem] mb-[.8rem]">歯医者メニュー</h2>
          <div className="flex gap-x-[1.6rem]">
            <button className="w-1/2 bg-baseColor py-[1.2rem] flex flex-col items-center rounded-[.8rem] drop-shadow-btn-shadow">
              <Image
                src={calender}
                alt="カレンダーアイコン"
                width={48}
                height={48}
              />
              <p className="text-[1.6rem]">予約</p>
            </button>
            <button className="w-1/2 bg-baseColor py-[1.2rem] flex flex-col items-center rounded-[.8rem] drop-shadow-btn-shadow">
              <Image src={clinic} alt="クリニック" width={48} height={48} />
              <p className="text-[1.6rem]">診察履歴</p>
            </button>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-[1.6rem] mb-[.8rem]">その他メニュー</h2>
          <div className="flex gap-x-[1.6rem]">
            <button className="w-1/3 bg-baseColor py-[1.2rem] flex flex-col items-center rounded-[.8rem] drop-shadow-btn-shadow">
              <Image src={present} alt="プレゼント" width={48} height={48} />
              <p className="text-[1.6rem]">ご褒美</p>
            </button>
            <button
              onClick={handleTrivia}
              className="w-1/3 bg-baseColor py-[1.2rem] flex flex-col items-center rounded-[.8rem] drop-shadow-btn-shadow"
            >
              <Image src={trivia} alt="豆知識" width={48} height={48} />
              <p className="text-[1.6rem]">豆知識</p>
            </button>
            <button className="w-1/3 bg-baseColor py-[1.2rem] flex flex-col items-center rounded-[.8rem] drop-shadow-btn-shadow">
              <Image src={settings} alt="設定" width={48} height={48} />
              <p className="text-[1.6rem]">設定</p>
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
