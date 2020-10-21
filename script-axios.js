// Select text input
const textInput = document.getElementById('city');
// Store the value of the input in a variable
let cityName = textInput.value;

// When an input event is triggered update cityName
textInput.addEventListener('input',e => {
  cityName = e.target.value;
  // console.log(cityName)
})
// Select our form
const form = document.querySelector('form');
// When form is submitted print 'submitted' to the browser console
form.addEventListener('submit', e => {
  // prevent form default behavior
  e.preventDefault();
  // make request to our API
  axios.get(`http://localhost:3001/api/weather?q=${cityName}`)
    .then(response =>{
      // select elements
      let city = document.querySelector('.cityName');
      let desc = document.querySelector('.description');
      let temperatur = document.querySelector('.temperatur');
      let wind = document.querySelector('.wind');
      let weatherIcon = document.querySelector('.weather-icon');
      let errorMessage = document.querySelector('.error-message');
    
      // console.log(response.data.icon);
      // console.log(response.data.description)
  if (response.data.name) {
        city.innerHTML = 'City: ' + response.data.name;
        desc.innerHTML = 'Description: ' + response.data.description;
        temperatur.innerHTML = 'Temperature: ' + response.data.temp;
        wind.innerHTML = 'Wind: ' + response.data.wind;
        weatherIcon.innerHTML = `<img src=\"icons/${response.data.icon}.png\" />`;   
      } else {
        errorMessage.innerHTML = "This city is not in our database"
      }
    })
    .catch(function(error) {
      console.log(error);
    })


  textInput.value = '';
})