// SELECT INPUT FORM
const inputText = document.getElementById('query');
let cityName = inputText.value;
// const form = document.getElementById('formInput')
inputText.addEventListener('input', e=> {
  cityName = e.target.value;
  console.log(cityName)
});

btn.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('submited');

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=193800cfd4e466a915d90441543f6446&units=metric`)
    .then(response => response.json())
    .then(data => {
      let city = document.getElementById("city");
      let description = document.getElementById("desc");
      let temperatur = document.getElementById("temp");
      let wind = document.getElementById("wind");
      let weatherIcon = document.getElementById('weather-icon');
      let errorMessage = document.getElementById('msg');
      if (data.name) {
        console.log(data.weather[0].icon)
        city.innerText = data.name;
        description.innerHTML = data.weather[0].description;
        temperatur.innerHTML = Math.round(data.main.temp) + '°C';
        wind.innerHTML = "speed: " + data.wind.speed + ",\ndeg: " + data.wind.deg
        weatherIcon.innerHTML = `<img src=\"icons/${data.weather[0].icon}.png\" />`;

      } else {
        errorMessage.innerHTML = "This city is unknown"
      }
    })
    .catch(error => console.log(error));

  inputText.value = '';
})
