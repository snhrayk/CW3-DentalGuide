import Footer from "@/components/footer";
import React from "react";

export default function Reward() {
  return (
    <>
      <div className="w-full h-[88vh] px-[1.6rem] flex flex-col">
        <h1 className="text-[3.2rem] text-center pt-[.8rem]">ご褒美</h1>
        <div className="w-full h-[18vh] mt-[0.8rem] flex rounded-2xl border overflow-hidden">
          <div className="w-1/3 bg-toothPaste bg-cover bg-center"></div>
          <div className="w-2/3 p-[1.2rem] flex flex-col justify-around">
            <h2 className="text-[2.8rem]">歯磨き粉</h2>
            <p className="text-[1.4rem]">
              <span className="text-gray-400">あと00日続けたらもらえる</span>
              <br />
              ECCさんの新作。爽やかなレモンの香りで、毎朝の歯磨きがリフレッシュタイムに。
            </p>
          </div>
        </div>
        <div className="w-full h-[18vh] mt-[0.8rem] flex rounded-2xl border overflow-hidden">
          <div className="w-1/3 bg-toothBrush bg-cover bg-center"></div>
          <div className="w-2/3 p-[1.2rem] flex flex-col justify-around">
            <h2 className="text-[2.8rem]">歯ブラシ</h2>
            <p className="text-[1.4rem]">
              <span className="text-gray-400">あと00日続けたらもらえる</span>
              <br />
              開発中の商品。密集した毛先で、しっかりと隅々まで磨ける快適な歯ブラシ。
            </p>
          </div>
        </div>
        <div className="w-full h-[18vh] mt-[0.8rem] flex rounded-2xl border overflow-hidden">
          <div className="w-1/3 bg-dentalFloss bg-cover bg-center"></div>
          <div className="w-2/3 p-[1.2rem] flex flex-col justify-around">
            <h2 className="text-[2.8rem]">デンタルフロス</h2>
            <p className="text-[1.4rem]">
              <span className="text-gray-400">あと00日続けたらもらえる</span>
              <br />
              ECCさんの新作。極細繊維で歯間にスムーズに入り、ミントの爽やかさが長持ちする。
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
