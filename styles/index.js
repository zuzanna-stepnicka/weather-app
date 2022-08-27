function search(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#searched-city");
  let newCity = enteredCity.value;
  let newCitySmall = newCity.toLowerCase();
  let newCityFinal = newCitySmall[0].toUpperCase() + newCitySmall.substring(1);
  //newCity is entered and i want to replace #typed-city with newCity
  let defaultCity = document.querySelector("#default-city");
  defaultCity.innerHTML = newCityFinal;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCityFinal}&appid=f969f80557f0fc40ffddd519ebd7d7f4&units=metric`;

  function showData(response) {
    let temp = response.data.main.temp;
    let temperature = Math.round(temp);
    let temperatureElement = document.querySelector(`#temperature`);
    temperatureElement.innerHTML = temperature;

    celciusTemperature = Math.round(temp);

    let description = response.data.weather[0].main;
    let descriptionElement = document.querySelector(`#description`);
    descriptionElement.innerHTML = description;

    let pressure = response.data.main.pressure;
    let pressureElement = document.querySelector(`#pressure`);
    pressureElement.innerHTML = pressure;

    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector(`#humidity`);
    humidityElement.innerHTML = humidity;

    let wind = response.data.wind.speed;
    let windElement = document.querySelector(`#wind`);
    windElement.innerHTML = wind;

    let icon = response.data.weather[0].icon;
    let emojiElement = document.querySelector(`#main-emoji`);
    emojiElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
  }

  axios.get(apiUrl).then(showData);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = "0" + minutes;
}

let time = `${day}, ${hours}:${minutes}`;

let date = document.querySelector("#date");
date.innerHTML = time;

///

function accessLocation() {
  navigator.geolocation.getCurrentPosition(getLocation);
  function getLocation(location) {
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;

    let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f969f80557f0fc40ffddd519ebd7d7f4&units=metric`;

    axios.get(apiUrlCurrent).then(showCurrentData);

    function showCurrentData(response) {
      let currentCity = response.data.name;
      let cityElement = document.querySelector(`#default-city`);
      cityElement.innerHTML = currentCity;

      let temp = response.data.main.temp;
      let temperature = Math.round(temp);
      let temperatureElement = document.querySelector(`#temperature`);
      temperatureElement.innerHTML = temperature;

      celciusTemperature = Math.round(temp);

      let description = response.data.weather[0].main;
      let descriptionElement = document.querySelector(`#description`);
      descriptionElement.innerHTML = description;

      let pressure = response.data.main.pressure;
      let pressureElement = document.querySelector(`#pressure`);
      pressureElement.innerHTML = pressure;

      let humidity = response.data.main.humidity;
      let humidityElement = document.querySelector(`#humidity`);
      humidityElement.innerHTML = humidity;

      let wind = response.data.wind.speed;
      let windElement = document.querySelector(`#wind`);
      windElement.innerHTML = wind;
      let icon = response.data.weather[0].icon;
      let emojiElement = document.querySelector(`#main-emoji`);
      emojiElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
    }
  }
}

let button = document.querySelector(`#button`);
button.addEventListener("click", accessLocation);

/// units conversion

let celciusTemperature = null;

function convertToFarenheit(event) {
  event.preventDefault();
  celciusTemp.classList.remove("active");
  farenheitTemp.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function converToCelcius(event) {
  event.preventDefault();
  celciusTemp.classList.add("active");
  farenheitTemp.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celciusTemperature;
}

let farenheitTemp = document.querySelector(`#farenheit-temp`);
farenheitTemp.addEventListener("click", convertToFarenheit);

let celciusTemp = document.querySelector("#celcius-temp");
celciusTemp.addEventListener("click", converToCelcius);
