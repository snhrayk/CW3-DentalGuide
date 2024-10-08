import { useState } from "react";
import Image from "next/image";
import music from "../public/img/music.svg";
import weather from "../public/img/weather.svg";
import news from "../public/img/news.svg";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";

export default function BrushTeeth() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleBrushingTime = () => {
    // 選択されたアイテムを localStorage に保存
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    router.push("/brushingtime");
  };

  const handleItemClick = (item) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        // 既に選択されているアイテムを削除
        return prevItems.filter((i) => i !== item);
      } else {
        // 新しいアイテムを追加する前に、現在の選択が2つ未満であることを確認
        if (prevItems.length < 2) {
          return [...prevItems, item];
        }
        return prevItems; // 2つ以上選択されている場合は変更なし
      }
    });
  };

  console.log("selectedItems", selectedItems);

  return (
    <>
      <main className="w-full h-[88dvh] px-[1.6rem] pt-[4rem] flex flex-col items-center">
        <h1 className="pb-[2.4rem] text-[3.2rem] text-center leading-[4rem]">
          今回は歯磨き中
          <br />
          何を流しますか?
        </h1>
        <ul className="w-full flex flex-col gap-[1.6rem]">
          <li
            onClick={() => handleItemClick("weather")}
            className={`flex justify-between items-center py-[0.8rem] px-[1.6rem] rounded-[1.6rem] bg-baseColor transition-transform duration-300 ease-in-out ${
              selectedItems.includes("weather")
                ? "border border-3 border-main scale-105"
                : "border-none"
            }`}
          >
            <Image src={weather} alt="天気のイラスト" />
            <div className="flex flex-col items-center">
              <h2 className="text-[2.4rem]">天気</h2>
              <p className="text-[1.2rem]">外出前に天気予報をチェック!</p>
            </div>
          </li>
          <li
            onClick={() => handleItemClick("music")}
            className={`flex justify-between items-center py-[0.8rem] px-[1.6rem] rounded-[1.6rem] bg-baseColor transition-transform duration-300 ease-in-out ${
              selectedItems.includes("music")
                ? "border border-3 border-main scale-105"
                : "border-none"
            }`}
          >
            <Image src={music} alt="音楽のイラスト" />
            <div className="flex flex-col items-center">
              <h2 className="text-[2.4rem]">音楽</h2>
              <p className="text-[1.2rem]">好きな音楽で楽しく歯磨き!</p>
            </div>
          </li>
          <li
            onClick={() => handleItemClick("news")}
            className={`flex justify-between items-center py-[0.8rem] px-[1.6rem] rounded-[1.6rem] bg-baseColor transition-transform duration-300 ease-in-out ${
              selectedItems.includes("news")
                ? "border border-3 border-main scale-105"
                : "border-none"
            }`}
          >
            <Image src={news} alt="ニュースのイラスト" />
            <div className="flex flex-col items-center">
              <h2 className="text-[2.4rem]">ニュース</h2>
              <p className="text-[1.2rem]">今日のニュースをチェック!</p>
            </div>
          </li>
        </ul>
        <button
          onClick={handleBrushingTime}
          className="inline-block px-[10rem] py-[1.2rem] text-[2rem] text-main font-semibold bg-baseColor rounded-[4rem] shadow-main-shadow mt-[6rem] mx-auto"
        >
          次へ
        </button>
      </main>
      <Footer />
    </>
  );
}
