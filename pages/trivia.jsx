import Footer from "@/components/footer";
import SpotifyPlayer from "@/components/spotifyPlayer";
import React from "react";

export default function Trivia() {
  return (
    <>
      <div className="w-full h-[88vh] flex flex-col">
        <h1 className="text-[3.2rem] text-center pt-[.8rem]">豆知識</h1>
        <p className="text-[1.6rem] text-center pb-[.8rem]">
          ここでは今まで紹介した豆知識をまとめています
        </p>
        <div className="flex-grow overflow-y-scroll flex flex-col gap-y-[.8rem]">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="collapse bg-base-200" key={index}>
              <input type="checkbox" />
              <div className="collapse-title text-[1.6rem] font-semibold flex justify-between items-center">
                <span className="text-[2.4rem]">No.{index + 1}</span>
                歯の形成は始まるのは胎児の時から!?
              </div>
              <div className="collapse-content">
                <p className="text-[1.6rem]">
                  赤ちゃんの歯（乳歯）は、母親のお腹の中にいる胎児の段階で既に形成が始まります。
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
