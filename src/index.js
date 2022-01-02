let date = new Date();

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentDay = days[date.getDay()];
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();
let currentMinute = date.getMinutes();
let currentHour = date.getHours();

h2.innerHTML = `<strong>${currentDay}</strong>, ${currentMonth} ${currentDate}, ${currentHour}:${currentMinute}`;

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  //document.querySelector("#city").innerHTML = response.data.name;
  //let temperature = Math.round(response.data.main.temp);
  //let displayTemp = document.querySelector("#temperature");
  //displayTemp.innerHTML = `${temperature}°C`;
}

function searchCity(city) {
  let apiKey = "ac113c799a92d362e85a0379e29d4ef2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let cityApiUrl = `${apiEndpoint}?q=${city}&units=metric`;

  axios.get(`${cityApiUrl}&appid=${apiKey}`).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchCoordinates(position) {
  let currentLongitude = position.coords.longitude;
  let currentLatitude = position.coords.latitude;
  let units = "metric";
  let apiKey = "ac113c799a92d362e85a0379e29d4ef2";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let currentApiUrl = `${apiEndpoint}?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=${units}`;

  axios.get(currentApiUrl).then(showTemperature);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCoordinates);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findCurrentLocation);
