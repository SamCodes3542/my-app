import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState("");
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");
  let [loaded, setLoaded] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5a281c704f6f1b324b8404bc0f462bee&units=metric`;

    if (city.length > 0) {
      axios.get(url).then(showWeather);
    } else {
      setLoaded(false);
    }
  }

  function showWeather(response) {
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
    setLoaded(true);
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  let inputValue = (
    <div className="Search">
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          type="search"
          placeholder="Enter a city.."
          onChange={showCity}
          autoFocus="on"
        />
        <input class="button" type="button" value="Search" />
      </form>
    </div>
  );

  let weatherForecast = (
    <h3>
      <ul>
        <li>City: {city}</li>
        <li>Temperature: {Math.round(temperature * 9) / 5 + 32}°F</li>
        <li>Description: {description}</li>
        <li>Humidity: {humidity}%</li>
        <li>Wind: {Math.round(wind)}km/h</li>
        <li>
          {" "}
          <img
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt="Weather icons"
          />
        </li>
      </ul>
    </h3>
  );

  if (loaded) {
    return (
      <div>
        {inputValue},{weatherForecast}
      </div>
    );
  }
  return inputValue;
}
