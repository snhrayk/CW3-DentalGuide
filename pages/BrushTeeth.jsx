import Footer from "@/components/footer";
import music from "../public/img/music.svg";

export default function BrushTeeth() {
  return (
    <>
      <main className="w-full h-[88dvh] px-[1.6rem] pt-[4rem]">
        <h1 className="text-[3.2rem] text-center">
          今回は歯磨き中
          <br />
          何を流しますか?
        </h1>
        <div>
          <img src={music} alt="音楽のイラスト" />
          <h2></h2>
          <p></p>
        </div>
        <div>
          <img src="" alt="" />
          <h2></h2>
          <p></p>
        </div>
        <div>
          <img src="" alt="" />
          <h2></h2>
          <p></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
