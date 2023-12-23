import React, { useState } from 'react';
import wind_icon from "./images/weatherIcons/Assets/wind.png";
import humidity_icon from "./images/weatherIcons/Assets/humidity.png";

const api = process.env.REACT_APP_API_KEY;
const baseURL = process.env.REACT_APP_BASE_URL;


function App() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
      if (evt.key === "Enter") {
        fetch(`${baseURL}weather?q=${query}&units=imperial&appid=${api}`)
          .then(res=>res.json())
          .then(result=> {
            setWeather(result);
            setQuery('');
            console.log(result);
          })
          .catch((error) => {
            console.error('Error fetching weather data: ', error);
            console.log(api);
            console.log(baseURL);
          });
      }
    }

    const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesdsay", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${month} ${date}, ${year}`
    }

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">
              {dateBuilder(new Date())}
            </div>
          </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}°F
          </div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
          <div className="extra-info">
            <div className="element">
              <img src={humidity_icon} alt="Humidity Icon" className="icon"></img>
              <div className="data">
                <h2>{weather.main.humidity}%</h2>
                <p>Humidity</p>
              </div>
            </div>
            <div className="element">
              <img src={wind_icon} alt="" className="icon"></img>
              <div className="data">
                <h2>{weather.wind.speed} mi/h</h2>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
