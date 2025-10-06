let locationInput = document.querySelector("#location").value;
const button = document.querySelector(".req-btn");
const weatherInfo = document.querySelector(".weather-info");
const loc = document.querySelector(".location");
const datetime = document.querySelector(".datetime");
const degrees = document.querySelector(".degrees");
const conditions = document.querySelector(".conditions");
const feelslike = document.querySelector(".feelslike");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
let icon = document.querySelector(".weather-icon");

displayWeather();

button.addEventListener("click", displayWeather);

async function displayWeather() {
  locationInput = document.querySelector("#location").value;
  const weather = await getWeather();

  loc.textContent = weather.location;
  datetime.textContent = weather.datetime;
  degrees.textContent = Math.round(Number(weather.temp));
  conditions.textContent = weather.conditions;
  feelslike.textContent = Math.round(Number(weather.feelslike));
  humidity.textContent = `${weather.humidity} %`;
  wind.textContent = `${weather.windspeed} km/h`;
  icon.src = `./assets/weather-icons-v2/${weather.icon}.svg`;
}

async function getWeather() {
  const apiKey = "9JFU89BS2RGU69RZ228XVBWYV";
  const unit = "metric"; // or "us"

  console.log(locationInput);
  if (!locationInput) locationInput = "cairo";

  const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}?key=${apiKey}&include=current&unitGroup=${unit}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {},
  });

  const data = await response.json();

  const filteredData = {
    location: data.resolvedAddress,
    datetime: data.days[0].datetime,
    temp: data.days[0].temp,
    feelslike: data.days[0].feelslike,
    humidity: data.days[0].humidity,
    windspeed: data.days[0].windspeed,
    conditions: data.days[0].conditions,
    icon: data.days[0].icon,
  };

  return filteredData;
}
