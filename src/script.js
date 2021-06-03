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
function formatDay(timestamp){
 let date= new Date (timestamp * 1000);
 let day = date.getDay();
 let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 
 return days[day];
}
function displayForecast(response){
  let dailyForecast=response.data.daily;
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML= `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index){
   if (index < 6) {
    forecastHTML= 
    forecastHTML + `
    <div class="col-2 forecast">
      <span class="forecast-day">${formatDay(forecastDay.dt)}</span>
      <img class="forecast-icon" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="icon" />
      <span class="forecast-min-temp">${Math.round(forecastDay.temp.min)}° - </span><span class="forecast-max-temp">${Math.round(forecastDay.temp.max)}°</span>
    </div>`}})
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

findCity("London");