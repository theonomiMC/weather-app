const express = require('express'); // import express
const app = express(); // initialize express
const cors = require('cors') //required to connect to front-end
const path = require("path");
const fetch = require("node-fetch");
//---pugs------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

require('dotenv').config({ path: __dirname + '/.env' }) //required to use env veriable



app.use(cors());

app.get('/api/weather', async (req, res) => {  
    let cityName = req.query.q
    const weather_api = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}&units=metric`
    
    if(cityName) {
      await fetch(weather_api)
        .then(response => response.json())
        .then((data) => {
          console.log(data)
          const sunRize = new Date(data.sys.sunrise*1000)
          const sunSet = new Date(data.sys.sunset*1000)
          return res.send({
            "name": data.name,
            "description": data.weather[0].description,
            "temp": Math.round(data.main.temp) + '°C',
            "wind": Math.round(data.wind.speed*3.6*100)/100 + ' km/h',
            "icon": data.weather[0].icon,
            "reelFeel":data.main.feels_like,
            "visibility":Math.floor(data.visibility/1000) + " km",
            "humidity":data.main.humidity + '%',
            "pressure":data.main.pressure + " mb",
            "sunrise":sunRize.getHours()+': '+ sunRize.getMinutes() + ' AM',
            "sunset":sunSet.getHours()+': '+ sunSet.getMinutes() + ' PM'
          })
        })
       
    }
   else{    
      res.send({ "status": "error", "message": "This city isn't in our database" })
    // res.status(404).end()
    }
  })
  
app.get('/api/weather/:id', (req, res, next)=>{
  let id = req.params.id
    res.json({"cityId":id})
    next()
})
  app.get("/", (req, res) => {
    res.render("index", {
      title:"SERVER",
      city:'Tbilisi'
    })
  });
  
  // Listen on port 3001
  app.listen(3001, function () {
    console.log('hello Natalia, listening on port 3001...');
  })
  