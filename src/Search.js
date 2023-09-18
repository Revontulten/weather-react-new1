import React, { useState } from "react";
import axios from "axios" ; 

export default function Search() {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [phrase, setPhrase] = useState("");

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
    setPhrase(`This is a current weather in ${city}:`);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Type the city.."
        onChange={updateCity}
      />
      <button type="Submit">Search</button>
    </form>
  );

  if (loaded) {
    return (
      <div className="theForecast">
        {form}
        <h3>{phrase}</h3>

        <div className="image">
          <ul>
            <li>
              <img src={weather.icon} alt={weather.description} />
            </li>
          </ul>
        </div>
        <div className="description">
          {" "}
          <ul>
            {" "}
            <li>
              <span className="item">Temperature: </span>
              {Math.round(weather.temperature)}°C
            </li>
            <li>
              <span className="item">Description: </span>
              {weather.description}
            </li>
            <li>
              <span className="item">Humidity: </span> {weather.humidity}%
            </li>
            <li>
              {" "}
              <span className="item">Wind:</span> {weather.wind} km/h
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
