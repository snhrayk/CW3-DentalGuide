import Image from "next/image";
import back from "../public/img/back.svg";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import React from "react";

export default function BrushingStart() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(60);
  const requestRef = useRef();
  const startRef = useRef();

  const handleBackPage = () => {
    router.push("/brushingtime");
  };

  useEffect(() => {
    const total = 60;
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
    <div className="w-full max-w-[92%] mx-auto">
      {/* 戻るボタン */}
      <div className="w-full pt-[0.8rem] pl-[0.8rem]">
        <button onClick={handleBackPage} className="w-[5.6rem] aspect-square">
          <Image src={back} alt="前の画面に戻る" />
        </button>
      </div>
      {/* api */}
      {/* カウントダウン */}
      <div
        id="countDown"
        className="w-full flex flex-col justify-center items-center py-4"
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
    </div>
  );
}
