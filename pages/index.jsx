import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <main className="w-full h-[88dvh] px-[16px] pt-[16px]">
        <h1 className="text-[4rem] font-extrabold">
          2024.06.27
          <span className="text-[2.4rem]">(木)</span>
        </h1>
        <div className="w-full h-auto flex bg-home-gradient shadow-main-shadow rounded-[24px]">
          <div
            className="radial-progress"
            style={{
              "--value": "70",
              "--size": "12rem",
              "--thickness": "2rem",
            }}
            role="progressbar"
          >
            70%
          </div>
          <div>
            <p className="text-[4rem]">25</p>
            {/* 何日続けられたか */}
            <p className="text-[1.6rem]">そろそろ歯ブラシの 交換時期です</p>
          </div>
        </div>
        <div>
          <h2>歯医者メニュー</h2>
          <button>予約</button>
          <button>診察履歴</button>
        </div>
        <div>
          <h2>その他メニュー</h2>
          <button>ご褒美</button>
          <button>豆知識</button>
          <button>設定</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
