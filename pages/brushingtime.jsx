import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import back from "../public/img/back.svg";
import hold from "../public/img/ippan005.png";
import direction from "../public/img/teeth-cleaning008.png";
import tip from "../public/img/teeth-cleaning001.png";

import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { useRouter } from "next/router";

export default function BrushingTime() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex);
  };

  const handleBackPage = () => {
    router.push("/BrushTeeth");
  };

  const handleStart = () => {
    router.push("/brushingStart");
  };

  const slideExplain = [
    "歯ブラシの持ち方を確認しましょう",
    "毛先の角度を正しく保ちましょう",
    "磨きづらい場合は毛先を使って磨きましょう",
  ];

  return (
    <div className="w-full h-[100dvh] flex flex-col items-center">
      <div className="w-full pt-[0.8rem] pl-[0.8rem]">
        <button onClick={handleBackPage} className="w-[5.6rem] aspect-square">
          <Image src={back} alt="前の画面に戻る" />
        </button>
      </div>
      <div
        className={`text-center transition-opacity duration-500 ${
          currentSlide === 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-[3.2rem] leading-[4rem] font-medium">
          歯磨きの準備は
          <br />
          できましたか？
        </h1>
        <p className="text-[2.0rem] ">今回は天気と音楽が流れます</p>
      </div>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className="mySwiper w-full h-[40dvh] mt-[6dvh] mb-[2dvh]"
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide className="relative">
          <Image src={hold} className="contain" alt="歯ブラシの持ち方" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={direction} className="contain" alt="毛先の角度" />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={tip}
            className="contain"
            alt="磨きづらい場合は毛先を使って磨きましょう"
          />
        </SwiperSlide>
      </Swiper>
      <p className="text-center text-[1.6rem]">{slideExplain[currentSlide]}</p>
      {currentSlide === 2 && (
        <button
          onClick={handleStart}
          className="inline-block px-[10rem] py-[1.2rem] text-[2rem] text-baseColor font-semibold bg-main rounded-[4rem] shadow-main-shadow mt-[4.8rem] mx-auto"
        >
          スタート
        </button>
      )}
    </div>
  );
}
