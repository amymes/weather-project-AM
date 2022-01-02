function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = response.data.main.temp;
}

let apiKey = "ac113c799a92d362e85a0379e29d4ef2";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let cityApiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;

axios.get(cityApiUrl).then(displayTemperature);
