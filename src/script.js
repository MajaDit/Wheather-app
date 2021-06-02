  function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10){hours=`0${hours}`};
  let minutes = date.getMinutes();
  if (minutes <10){minutes=`0${minutes}`};
  let day = date.getDate();
  let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let month = months[date.getMonth()];
  return ` ${day} ${month} ${hours}:${minutes}`;
}

function displayForecast(response){
  console.log(response.data.daily);
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML= `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day){
  forecastHTML= 
    forecastHTML + `
    <div class="col-2 forecast">
      <span class="forecast-day">${day}</span>
      <img class="forecast-icon" src="https://img.icons8.com/doodle/96/000000/moon-and-sun.png" alt="icon" />
      <span class="forecast-min-temp">18° - </span><span class="forecast-max-temp">20°</span>
    </div>`;})
    forecastHTML= forecastHTML + `</div>`;

  forecastElement.innerHTML= forecastHTML;
}
function getForecast(coordinates){
  let apiKey="ad2ff494a03279abf350d133542944f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function findCurrentData(response){
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML= Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city-country");
  h1.innerHTML=`${response.data.name}, ${response.data.sys.country}`;
  let description= document.querySelector("#description");
  description.innerHTML=response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML=`${Math.round(response.data.main.humidity)}%`;
  let wind=document.querySelector("#wind");
  wind.innerHTML=`${response.data.wind.speed}km/h`;
  let date= document.querySelector("#date");
  date.innerHTML=formatDate(response.data.dt *1000);
  celsiusTemperature=Math.round(response.data.main.temp);
  let icon = document.querySelector("#icon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}
function findCity(city){
  let apiKey="ad2ff494a03279abf350d133542944f6";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(findCurrentData);
}

function submitForm(event){
  event.preventDefault();
  let input = document.querySelector("#search-input").value;
  findCity(input);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitForm);

function displayFahrenheit(event){
  event.preventDefault();
  let fahrenheitTemperature = celsiusTemperature*9/5 +32;
  let temperature=document.querySelector("#current-temperature");
  temperature.innerHTML=Math.round(fahrenheitTemperature);
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
}

let celsiusTemperature = null
let fahrenheit=document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheit);

function displayCelsius(event){
  event.preventDefault();
  let temperature=document.querySelector("#current-temperature");
  temperature.innerHTML=celsiusTemperature;
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let celsius=document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsius);

findCity("London");