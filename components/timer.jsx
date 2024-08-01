import React from "react";
import { useRef, useState, useEffect } from "react";
import guideOne from "../public/img/guide1.svg";
import guideTwo from "../public/img/guide2.svg";
import guideThree from "../public/img/guide3.svg";
import { useRouter } from "next/navigation";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [imageIndex, setImageIndex] = useState(0);
  const requestRef = useRef();
  const startRef = useRef();
  const router = useRouter();

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
          stroke="#45AAF5"
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
  );
}
