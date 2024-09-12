
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [time, setTime] = useState(new Date());

  const fetchWeather = async (city) => {
    const apiKey = 'f8f27c6e3228f3ad6c5bf35614d9c85b';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeatherData({
        temp: response.data.main.temp,
        weather: response.data.weather[0].description,
        hiLow: `${response.data.main.temp_min}°c / ${response.data.main.temp_max}°c`,
        city: response.data.name,
        country: response.data.sys.country,
        date: new Date().toLocaleDateString(),
      });
      setError('');
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchWeather(city);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-wrap">
      <header>
        <input
          type="text"
          className="search-box"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleSearch}
        />
      </header>

      {weatherData && (
        <main>
          <section className="location">
            <div className="city">{weatherData.city}, {weatherData.country}</div>
            <div className="date">{weatherData.date} {time.toLocaleTimeString()}</div>
          </section>
          <div className="current">
            <div className="temp-icon">
              <div className="temp">{weatherData.temp}<span>°c</span></div>
            </div>
            <div className="weather">{weatherData.weather}</div>
            <div className="hi-low">{weatherData.hiLow}</div>
          </div>
        </main>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Home;
