// SELECT INPUT FORM
const inputText = document.getElementById('query');
let cityName = inputText.value;
const form = document.getElementById('formInput')
inputText.addEventListener('input', e => {
  cityName = e.target.value;
  console.log(cityName)
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('submited');

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=614c82475666965970f1257189e30877&units=metric`)
    .then(response => {
      if (response.ok) {
        console.log(response.ok)
        return response.json()
      }
      throw new Error('somthing went wrong!')
    })
    .then(data => {

      let city = document.querySelector(".CityNames");
      let description = document.querySelector(".Description");
      let temperatur = document.querySelector(".Temperatur");
      let wind = document.querySelector(".Wind");
      let weatherIcon = document.querySelector('#weather-icon');
      let Weatherinfo = document.querySelector('.Weatherinfo');

      console.log(data.weather[0].icon)
      console.log(data.name)
      city.innerHTML = data.name;
      description.innerHTML = data.weather[0].description;
      temperatur.innerHTML = Math.round(data.main.temp) + '°C';
      wind.innerHTML = "speed: " + data.wind.speed + ",\ndeg: " + data.wind.deg
      weatherIcon.innerHTML = `<img src=\"icons/${data.weather[0].icon}.png\" />`;
    })
    .catch(error => {
      console.log(error)
      Weatherinfo.innerHTML = "Connection faild, please try later .. ";
    })
  
inputText.value = '';
})
