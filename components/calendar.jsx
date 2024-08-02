import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // 選択された日付の状態を追加

  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Array(31)
      .fill(null)
      .map((_, i) => new Date(year, month, i + 1))
      .filter((date) => date.getMonth() === month);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Add empty days for the previous month to align the first day of the current month correctly
  const daysToDisplay = [...new Array(startDay).fill(null), ...daysInMonth];

  // 日付を「2024.08.24(土)」形式でフォーマットする関数
  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][date.getDay()];
    return `${year}.${month}.${day}(${dayOfWeek})`;
  };

  return (
    <>
      <div className="p-[1.6rem] pb-[2.4rem]">
        <div className="flex justify-between items-center mb-[3.2rem]">
          <button onClick={handlePreviousMonth}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7071 7.29289C21.0976 7.68342 21.0976 8.31658 20.7071 8.70711L13.4142 16L20.7071 23.2929C21.0976 23.6834 21.0976 24.3166 20.7071 24.7071C20.3166 25.0976 19.6834 25.0976 19.2929 24.7071L11.2929 16.7071C10.9024 16.3166 10.9024 15.6834 11.2929 15.2929L19.2929 7.29289C19.6834 6.90237 20.3166 6.90237 20.7071 7.29289Z"
                fill="#333132"
              />
            </svg>
          </button>
          <h2 className="text-[3.2rem]">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="text-blue-500 text-[2rem]"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2929 7.29289C10.9024 7.68342 10.9024 8.31658 11.2929 8.70711L18.5858 16L11.2929 23.2929C10.9024 23.6834 10.9024 24.3166 11.2929 24.7071C11.6834 25.0976 12.3166 25.0976 12.7071 24.7071L20.7071 16.7071C21.0976 16.3166 21.0976 15.6834 20.7071 15.2929L12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289Z"
                fill="#333333"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`font-bold text-[1.6rem] ${
                day === "日"
                  ? "text-[#F54545]"
                  : day === "土"
                  ? "text-[#45AAF5]"
                  : "text-[#333]"
              }`}
            >
              {day}
            </div>
          ))}
          {daysToDisplay.map((date, index) => (
            <div
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`pt-[.8rem] px-[.8rem] pb-[3.2rem] text-[1.6rem] ${
                !date
                  ? "bg-transparent"
                  : date.getDay() === 0
                  ? "text-[#F54545]"
                  : date.getDay() === 6
                  ? "text-[#45AAF5]"
                  : "text-[#333]"
              } cursor-pointer`}
            >
              {date ? date.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[32dvh] pt-[.8rem] px-[2.4rem] border-t">
        {selectedDate ? (
          <>
            <p className="text-[2.4rem] font-semibold mb-[.8rem]">
              {formatDate(selectedDate)}
            </p>
            <div className="flex flex-col gap-y-[.8rem]">
              <div className="bg-base-200 rounded-[.8rem] px-[.8rem] py-[1.6rem]">
                <p className="text-[2.4rem]">
                  <span className="text-[1.6rem]">磨いた数 : </span>3/3回
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-[3.2rem]"></p>
        )}
      </div>
    </>
  );
};

export default Calendar;
