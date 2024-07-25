import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherComponent = () => {
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
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const currentWeather = weatherData?.current_weather;
  const dailyData = weatherData?.daily;

  return (
    <div>
      <h1>大阪の現在の天気</h1>
      {currentWeather && dailyData && (
        <div>
          <p>気温: {currentWeather.temperature}°C</p>
          <p>天気: {currentWeather.weathercode}</p>
          <p>降水確率: {dailyData.precipitation_probability_mean[0]}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
