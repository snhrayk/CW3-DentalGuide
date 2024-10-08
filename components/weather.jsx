import React, { useState, useEffect } from "react";
import axios from "axios";

const weatherName = {
  0: "快晴",
  1: "ほぼ快晴",
  2: "一部曇り",
  3: "曇り",
  45: "霧",
  48: "着氷性霧",
  51: "弱い霧雨",
  53: "中程度の霧雨",
  55: "濃い霧雨",
  56: "弱い凍結霧雨",
  57: "濃い凍結霧雨",
  61: "弱い雨",
  63: "中程度の雨",
  65: "激しい雨",
  66: "弱い凍結雨",
  67: "激しい凍結雨",
  71: "弱い雪",
  73: "中程度の雪",
  75: "激しい雪",
  77: "雪粒",
  80: "弱い雨のにわか雨",
  81: "中程度の雨のにわか雨",
  82: "激しい雨のにわか雨",
  85: "弱い雪のにわか雪",
  86: "激しい雪のにわか雪",
  95: "雷雨",
  96: "弱いひょうを伴う雷雨",
  99: "激しいひょうを伴う雷雨",
};

const getWeatherName = (code) => weatherName[code] || "不明";

const Weather = ({ onWeatherUpdate }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: 34.6937,
              longitude: 135.5023,
              current_weather: true,
              daily:
                "temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_mean",
              timezone: "Asia/Tokyo",
            },
          }
        );
        setWeatherData(response.data);
        setLoading(false);
        if (onWeatherUpdate) {
          onWeatherUpdate(response.data); // Notify parent component
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [onWeatherUpdate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const currentWeather = weatherData?.current_weather;
  const dailyData = weatherData?.daily;

  return (
    <>
      {currentWeather && dailyData && (
        <div className="w-[2/3] h-full text-baseColor">
          <p className="text-[1.6rem] font-semibold">大阪府大阪市</p>
          <div className="flex items-center gap-x-[2.4rem]">
            <div>
              <p className="text-[5.6rem] font-bold">
                {currentWeather.temperature}
                <span className="text-[3.2rem]">℃</span>
              </p>
            </div>
            <div>
              <p className="text-[2.4rem]">
                {getWeatherName(currentWeather.weathercode)}
              </p>
              <p className="flex text-[1.6rem] gap-x-[.4rem]">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12C21 12.2449 20.91 12.4813 20.7473 12.6644C20.5845 12.8474 20.3603 12.9643 20.117 12.993L20 13H13V18C13.0003 18.2549 13.0979 18.5 13.2728 18.6854C13.4478 18.8707 13.687 18.9822 13.9414 18.9972C14.1958 19.0121 14.4464 18.9293 14.6418 18.7657C14.8373 18.6021 14.9629 18.3701 14.993 18.117L15 18C15 17.7348 15.1054 17.4804 15.2929 17.2929C15.4804 17.1054 15.7348 17 16 17C16.2652 17 16.5196 17.1054 16.7071 17.2929C16.8946 17.4804 17 17.7348 17 18C17.0008 18.7809 16.697 19.5313 16.1532 20.0918C15.6095 20.6523 14.8686 20.9787 14.088 21.0016C13.3075 21.0245 12.5487 20.7422 11.973 20.2145C11.3973 19.6869 11.0501 18.9556 11.005 18.176L11 18V13H4C3.75507 13 3.51866 12.91 3.33563 12.7473C3.15259 12.5845 3.03566 12.3602 3.007 12.117L3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3Z"
                      fill="#f6f9fa"
                    />
                  </svg>
                </span>
                {dailyData.precipitation_probability_mean[0]}%
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
