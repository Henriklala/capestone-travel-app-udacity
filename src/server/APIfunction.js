const fetch = require("node-fetch")
const dotenv = require('dotenv');
dotenv.config();
//geonames API
const geonamesUrl = "http://api.geonames.org/searchJSON?q=";
//weatherbit API
const weatherUrl = "https://api.weatherbit.io/v2.0/current?units=M"; //expired
//pixabay API
const pixabayUrl = "https://pixabay.com/api/?image_type=photo&q=";

const getGeonames = async (geonamesUrl,location,geonames_USERNAME)=>{
    const res = await fetch(geonamesUrl+location+process.env.geonames_USERNAME)
    try{
      const geoData = await res.json();
      return geoData;
    } catch(error){
      console.log("geo error",error);
    }
};
  
const getWeather = async (weatherUrl,latlong,weatherbit_KEY)=>{
    const res = await fetch(weatherUrl+latlong+process.env.weatherbit_KEY)
    try{
      const weatherData = await res.json();
      return weatherData;
    }catch(error){
      console.log("weahter error",error);
    }
};
  
const getPixabay = async (pixaUrl,location,pixabay_KEY)=>{
    const res = await fetch(pixaUrl+location+process.env.pixabay_KEY)
    try{
      const pixaData = await res.json();
      return pixaData;
    }catch(error){
      console.log("pix error",error);
    }
};

module.exports = {
    getGeonames,
    getWeather,
    getPixabay
}