import Image from "next/image";
import React from "react";
import finish from "../public/img/finish.svg";
import { useRouter } from "next/navigation";

export default function Finish() {
  const router = useRouter();
  const handleFinish = () => {
    router.push("/BrushTeeth");
  };

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center">
      <Image src={finish} alt="finish" />
      <h1 className="text-[2.4rem]">歯磨きお疲れ様でした</h1>
      <p className="text-[1.6rem]">あと2回歯磨き頑張りましょう</p>
      <button
        onClick={handleFinish}
        className="inline-block px-[10rem] py-[1.2rem] text-[2rem] text-baseColor font-semibold bg-main rounded-[4rem] shadow-main-shadow mt-[12rem] mx-auto"
      >
        終わる
      </button>
    </div>
  );
}
