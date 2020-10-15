// SELECT INPUT FORM
const cityInput = document.getElementById('query')
let cityName = cityInput.value;

// ADD EVENTLISTNERER TO TEXT INPUT
cityInput.addEventListener('input', e => {
  cityName = e.target.value;
  // console.log(cityName)
})

//SELECT FORM
const form = document.querySelector('form')
//CREATE FORM EVENTLISTNER TO GET DATA FROM SERVER
form.addEventListener('submit', e => {

  e.preventDefault();
  fetch(`http://localhost:3001/api/weather?q=${cityName}`)
    .then(response => {
      if(response.ok){
        console.log(response.ok)
        document.getElementById("aftersubmit").style.display = "flex";
        return response.json()
      }
       console.log('no connection')  
    }
      
      )
    .then(result => {
      let city = document.querySelector('.cityName');
      let desc = document.querySelector('.description');
      let temperature = document.querySelector('.temperature');
      let wind = document.querySelector('.wind');
      let visib = document.querySelector('.visibility');
      let hum = document.querySelector('.humidity');
      let weatherIcon = document.querySelector('.weather-icon');
      let reelFeel = document.querySelector('.feels-like');
      let sunrise = document.querySelector('.sunrise');
      let sunset = document.querySelector('.sunset');
      let pressure = document.querySelector('.pressure');

        city.innerHTML = result.name
        desc.innerHTML = result.description;
        temperature.innerHTML = result.temp;
        wind.innerHTML = 'Wind: ' + result.wind;
        weatherIcon.innerHTML = `<img src=\"icons/${result.icon}.png\" />`;
        reelFeel.innerHTML = result.reelFeel;
        visib.innerHTML = 'Visibility: ' + result.visibility;
        hum.innerHTML = 'Humidity: ' + result.humidity;
        sunrise.innerHTML = "Sunrise: " + result.sunrise;
        sunset.innerHTML = "Sunset: " + result.sunset;
        pressure.innerHTML = "Pressure: " + result.pressure;
    
    }).catch(error => {
      console.log(error);
      document.querySelector(".error-message").innerText = "Connection faild, please try later .. ";
    })

  cityInput.value = '';
})
document.getElementById('footer').innerHTML = '©  ' + new Date().getFullYear() + ' <strong>WeatherApp</strong> by Natalia THeg';
document.getElementById('short-date').innerHTML = (new Date().getMonth() + 1) + "/" + new Date().getDate();