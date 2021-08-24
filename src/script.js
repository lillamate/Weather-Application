function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#temp_min").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector("#temp_max").innerHTML = Math.round(
    response.data.main.temp_max
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  celsiusConverter.classList.remove("active");
  fahrenheitConverter.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitConverter.classList.remove("active");
  celsiusConverter.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

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

let celsiusTemperature = null;

let fahrenheitConverter = document.querySelector("#f-converter");
fahrenheitConverter.addEventListener("click", displayFahrenheitTemperature);

let celsiusConverter = document.querySelector("#c-converter");
celsiusConverter.addEventListener("click", displayCelsiusTemperature);

searchCity("Amsterdam");
