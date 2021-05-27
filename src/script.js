let apiKey="ad2ff494a03279abf350d133542944f6";
let city ="London"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function displayCurrentTemperature(response){
  console.log(timestamp);
}
console.log(apiUrl);
axios.get(apiUrl).then(displayCurrentTemperature);

