import Footer from "@/components/footer";
import Image from "next/image";
import React from "react";
import test from "../public/img/test.png";

export default function Record() {
  return (
    <>
      <main className="w-full h-[88dvh] px-[1.6rem] pt-[5rem]">
        <Image src={test} alt="test" />
      </main>
      <Footer />
    </>
  );
}
