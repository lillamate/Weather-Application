function getForecast(coordinates) {
  let apiKey = "5dade0a6a276f87b4f3a99dd558bdd06";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

// Global variables for temperature conversions
let celsiusTemperature = null;
let celsiusMinTemp = null;
let celsiusMaxTemp = null;

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let minimumTempElement = document.querySelector("#temp_min");
  let maximumTempElement = document.querySelector("#temp_max");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  celsiusMinTemp = response.data.main.temp_min;
  celsiusMaxTemp = response.data.main.temp_max;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  minimumTempElement.innerHTML = Math.round(celsiusMinTemp);
  maximumTempElement.innerHTML = Math.round(celsiusMaxTemp);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5dade0a6a276f87b4f3a99dd558bdd06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5dade0a6a276f87b4f3a99dd558bdd06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitMinTemp = (celsiusMinTemp * 9) / 5 + 32;
  let fahrenheitMaxTemp = (celsiusMaxTemp * 9) / 5 + 32;

  celsiusConverter.classList.remove("active");
  celsiusConverter.classList.add("inactive");
  fahrenheitConverter.classList.remove("inactive")
  fahrenheitConverter.classList.add("active");

  let temperatureElement = document.querySelector("#temperature");
  let minimumTempElement = document.querySelector("#temp_min");
  let maximumTempElement = document.querySelector("#temp_max");

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  minimumTempElement.innerHTML = Math.round(fahrenheitMinTemp);
  maximumTempElement.innerHTML = Math.round(fahrenheitMaxTemp);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitConverter.classList.remove("active");
  fahrenheitConverter.classList.add("inactive");
  celsiusConverter.classList.remove("inactive");
  celsiusConverter.classList.add("active");


  let temperatureElement = document.querySelector("#temperature");
  let minimumTempElement = document.querySelector("#temp_min");
  let maximumTempElement = document.querySelector("#temp_max");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  minimumTempElement.innerHTML = Math.round(celsiusMinTemp);
  maximumTempElement.innerHTML = Math.round(celsiusMaxTemp);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2 forecast-cards">
            <div class="weather-forecast-date" id="forecast-day">${formatDay(
              forecastDay.dt
            )}</div><img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="56"
            />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-max">${Math.round(
                forecastDay.temp.max
              )}° </span>
            <span class="weather-forecast-min">${Math.round(
              forecastDay.temp.min
            )}° </span></div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Event Listeners
let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let now = new Date();
let h2 = document.querySelector("h2");

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h2.innerHTML = `${day}, ${hours}:${minutes}`;

let currentDate = document.querySelector("#current-date");
let date = now.getDate();
let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let month = months[now.getMonth()];
let year = now.getFullYear();

currentDate.innerHTML = `${date}-${month}-${year}`;

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitConverter = document.querySelector("#f-converter");
fahrenheitConverter.addEventListener("click", displayFahrenheitTemperature);

let celsiusConverter = document.querySelector("#c-converter");
celsiusConverter.addEventListener("click", displayCelsiusTemperature);

searchCity("Amsterdam");
