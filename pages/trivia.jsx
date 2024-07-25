import React from "react";

export default function Trivia() {
  return (
    <div className="w-full">
      <div className="collapse bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-[2rem] font-medium">
          歯の形成は始まるのは 胎児の時から!?
        </div>
        <div className="collapse-content">
          <p className="text-[1.6rem]">
            赤ちゃんの歯（乳歯）は、母親のお腹の中
            にいる胎児の段階で既に形成が始まります。
          </p>
        </div>
      </div>
    </div>
  );
}
