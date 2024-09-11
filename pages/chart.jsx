import Footer from "@/components/footer";
import React from "react";

export default function Chart() {
  return (
    <>
      <div className="w-full h-[88vh] px-[1.6rem] flex flex-col">
        <h1 className="text-[3.2rem] text-center pt-[.8rem]">診察履歴</h1>
        <div className="w-full h-[20vh] mt-[0.8rem] px-[1.6rem] flex flex-col justify-around rounded-2xl border overflow-hidden">
          <h2 className="text-[2.4rem]">2024年7月15日</h2>
          <ul className="text-[1.6rem]">
            <li>
              <span className="font-bold">症状:</span>
              <br />
              左奥歯に虫歯
            </li>
            <li>
              <span className="font-bold">治療内容:</span>
              <br />
              虫歯の除去と詰め物（コンポジットレジン）
            </li>
          </ul>
        </div>
        <div className="w-full h-[20vh] mt-[0.8rem] px-[1.6rem] flex flex-col justify-around rounded-2xl border overflow-hidden">
          <h2 className="text-[2.4rem]">2023年7月15日</h2>
          <ul className="text-[1.6rem]">
            <li>
              <span className="font-bold">症状:</span>
              <br />
              歯茎の炎症による歯周病の初期症状
            </li>
            <li>
              <span className="font-bold">治療内容:</span>
              <br />
              歯石除去、歯茎のクリーニング
            </li>
          </ul>
        </div>
        <div className="w-full h-[20vh] mt-[0.8rem] px-[1.6rem] flex flex-col justify-around rounded-2xl border overflow-hidden">
          <h2 className="text-[2.4rem]">2021年9月5日</h2>
          <ul className="text-[1.6rem]">
            <li>
              <span className="font-bold">症状:</span>
              <br />
              右上の親知らずの痛み
            </li>
            <li>
              <span className="font-bold">治療内容:</span>
              <br />
              親知らずの抜歯
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
