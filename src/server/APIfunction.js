const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const getGeonames = async (newLocation) => {
  const res = await fetch(
    `${`http://api.geonames.org/searchJSON?q=${newLocation}&username=${process.env.geonames_USERNAME}`}`
  );

  const geoData = await res.json();
  return geoData
};

const getWeather = async (lat,long) => {
  const res = await fetch(`${`https://api.weatherbit.io/v2.0/current?units=M&lat=${lat}&lon=${long}&key=${process.env.weatherbit_KEY}`}`);

  const weatherData = await res.json();
  return weatherData
};

const getPixabay = async (city) => {
  const res = await fetch(`${`https://pixabay.com/api/?image_type=photo&q=${city}&key=${process.env.pixabay_KEY}`}`);
  
  const pixaData = await res.json();
  return pixaData
};

module.exports = {
  getGeonames,
  getWeather,
  getPixabay,
};