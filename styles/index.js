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

  function showTemperature(response) {
    let temp = response.data.main.temp;
    let temperature = Math.round(temp);
    let newTemperature = document.querySelector(`#temperature`);
    newTemperature.innerHTML = temperature;
  }

  axios.get(apiUrl).then(showTemperature);
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

    axios.get(apiUrlCurrent).then(showTemperature);

    function showTemperature(response) {
      let currentTemp = response.data.main.temp;
      let curentTemperature1 = Math.round(currentTemp);
      let curentTemperature = document.querySelector(`#temperature`);
      curentTemperature.innerHTML = curentTemperature1;
    }
  }
}

let button = document.querySelector(`#button`);
button.addEventListener("click", accessLocation);
