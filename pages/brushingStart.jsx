import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Script from "next/script";
import Image from "next/image";
import guideOne from "../public/img/guide1.svg";
import guideTwo from "../public/img/guide2.svg";
import guideThree from "../public/img/guide3.svg";
import Weather from "@/components/weather";

export default function BrushingStart() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60);
  const [imageIndex, setImageIndex] = useState(0);

  const handleBackPage = () => {
    router.push("/brushingtime");
  };

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
          {/* 天気 */}
          <div className="w-[2/3] h-full text-baseColor">
            <p className="text-[1.6rem] font-semibold ">大阪府大阪市</p>
            <Weather />
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
