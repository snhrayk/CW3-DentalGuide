import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import guide1 from "../public/img/leftTop-out.svg";
import guide2 from "../public/img/top-out.svg";
import guide3 from "../public/img/rightTop-out.svg";
import Image from "next/image";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [imageIndex, setImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(true); // 画像表示状態
  const [showText, setShowText] = useState(true); // テキスト表示状態
  const requestRef = useRef();
  const startRef = useRef();
  const router = useRouter();

  // 画像リスト
  const images = [guide1, guide2, guide3];

  // 画像に応じたテキスト
  const imageTexts = [
    { number: "1/12", description: "左上の外側のゾーン" },
    { number: "2/12", description: "真ん中の外側のゾーン" },
    { number: "3/12", description: "右上の外側のゾーン" },
  ];

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
        setShowImage(false); // タイマー終了時に画像を非表示
        setShowText(false); // タイマー終了時にテキストを非表示
        setTimeout(() => {
          router.push("/finish");
        }, 2000);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    // 25秒ごとに画像を切り替える
    const imageChangeInterval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 25秒ごと

    return () => {
      cancelAnimationFrame(requestRef.current);
      clearInterval(imageChangeInterval);
    };
  }, [router]);

  const { number, description } = imageTexts[imageIndex];

  return (
    <div
      id="countDown"
      className="w-full flex flex-col justify-center items-center py-4 mt-[3.2em]"
    >
      <svg className="w-full max-w-[350px] h-auto" viewBox="0 0 300 300">
        <circle
          className="circle"
          r="135"
          cx="150"
          cy="150"
          fill="transparent"
          stroke="#45AAF5"
          strokeWidth="24"
          strokeLinecap="round"
          transform="rotate(-90 150 150)"
        />
        {showText && (
          <>
            <text
              x="150"
              y="72"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[2rem] font-semibold"
              fill="#333"
            >
              {number}
            </text>
            <text
              x="150"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[2rem] font-semibold"
              fill="#333"
            >
              {description}
            </text>
          </>
        )}
        {showImage && (
          <image
            href={images[imageIndex].src}
            x="75"
            y="104"
            width="150"
            height="150"
            preserveAspectRatio="xMidYMid meet"
          />
        )}
      </svg>
      <div className="timerText mt-[3.2rem] text-[4.8rem] font-semibold"></div>
    </div>
  );
}
