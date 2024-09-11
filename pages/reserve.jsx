import Footer from "@/components/footer";
import React from "react";

export default function Reserve() {
  return (
    <>
      <div className="w-full h-[88vh] px-[1.6rem] flex flex-col">
        <h1 className="text-[3.2rem] text-center pt-[.8rem]">歯科予約</h1>
        <div className="w-full h-[18vh] mt-[0.8rem] flex rounded-2xl border overflow-hidden">
          <div className="w-1/2 bg-dental bg-cover"></div>
          <div className="w-1/2 p-[1.2rem] flex flex-col justify-around">
            <h2 className="text-[2.8rem]">ECC歯科</h2>
            <p className="text-[1.4rem]">
              <span>〒530-0015</span>
              <br />
              大阪府大阪市北区中崎西１丁目４−１２
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
