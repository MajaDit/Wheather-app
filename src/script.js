let apiKey="ad2ff494a03279abf350d133542944f6";
let city ="London"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
function displayDate(response){
  let date= document.querySelector("#date");
  date.innerHTML=formatDate(response.data.dt *1000);
}

axios.get(apiUrl).then(displayDate);


function submitForm(event){
  event.preventDefault();
  axios.get(apiUrl).then(findTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitForm);