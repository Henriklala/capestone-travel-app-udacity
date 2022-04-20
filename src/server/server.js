var path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { getGeonames } = require("./APIfunction");
const { getWeather } = require("./APIfunction");
const { getPixabay } = require("./APIfunction");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
//storing 
let projectData = {
  image: null,
  location: null,
  weather: null,
};

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.post("/postLocation", (req, res) => {
  const date = req.body.date;
  getGeonames(req.body.newLocation)
    .then((geoData) => {
      const countryName = geoData.geonames[0].countryName;
      const theCity = geoData.geonames[0].name;
      const lat = geoData.geonames[0].lat;
      const long = geoData.geonames[0].lng;
      const days = date

      projectData.location = {
        city: theCity,
        country: countryName,
        daysuntill: days
      };
      //passing needed values to next chain to get weather info
      return {
        lat,
        long,
        theCity,
      };
    })
    .then((geoData) => {
      getWeather(geoData.lat, geoData.long, geoData.theCity)
        .then((weatherData) => {
          const temperature = Math.round(weatherData.data[0].temp);
          const weatherDescription = weatherData.data[0].weather;

          projectData.weather = {
            weather: weatherDescription.description,
            temp: temperature,
          };
        })
        .catch((error) => {
          console.log(error, "getWeather error!");
        });
        //passing the city name to next chain to find picture of city
      return geoData.theCity;
    })
    .then((pixaData) => {
      getPixabay(pixaData)
        .then((pixaData) => {
          const picture = pixaData.hits[0].webformatURL;

          projectData.image = {
            pic: picture,
          };
          res.send(projectData);
          console.log("projectData :", projectData);
        })
        .catch((error) => {
          console.log(error, "getPixabay error!");
        });
    });
});
module.exports = app;