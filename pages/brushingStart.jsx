import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Weather from "@/components/weather";
import Timer from "@/components/timer";

export default function BrushingStart() {
  const router = useRouter();
  return (
    <>
      <div
        className={`w-full h-[26dvh] rounded-bl-[1.6rem] rounded-br-[1.6rem] shadow-main-shadow overflow-hidden bg-main`}
      >
        <div className="w-full h-auto flex items-center bg-artist backdrop-blur-btn-blur">
          <button
            onClick={() => router.push("/brushingtime")}
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
          <Weather />
        </div>
      </div>
      <Timer />
    </>
  );
}
