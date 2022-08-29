function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thr", "Fir", "Sat", "Sun"];
  return days[day];
}

function displayForecast(forecastDays) {
  let forecastElement = document.querySelector(`#forecast`);

  let forecastHTML = `<div class="row">`;

  forecastDays.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                <div class="weatherForecastDay">${formatDate(
                  forecastDay.dt
                )}</div>
                <div class="emoji">
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" id="emoji" alt="Clear"/>
                </div>
                <div class="weatherForecastTemperature"> <span id="forecastMaxTemp">${Math.round(
                  forecastDay.temp.max
                )}°C</span>   <span id="forecastMinTemp">${Math.round(
        forecastDay.temp.min
      )}°C</span> </div>
            </div>`;
  });

  forecastHTML = forecastHTML + "</div>";

  forecastElement.innerHTML = forecastHTML;
}

function getCoordinates(coordinates) {
  function getForecast(response) {
    let day1 = response.data.daily[0];
    let day2 = response.data.daily[1];
    let day3 = response.data.daily[2];
    let day4 = response.data.daily[3];
    let day5 = response.data.daily[4];
    let forecastDays = [day1, day2, day3, day4, day5];
    console.log([forecastDays]);
    displayForecast(forecastDays);
  }

  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrlCoords = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=eae061c95483dd066657bfc7525418ed&units=metric`;
  axios.get(apiUrlCoords).then(getForecast);
}

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
    getCoordinates(response.data.coord);
  }

  axios.get(apiUrl).then(showData);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

/////////////////////////////////////

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

////////////////////////////////////////////////

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

      getCoordinates(response.data.coord);
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
