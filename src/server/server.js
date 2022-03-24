var path = require("path")
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const { getGeonames } = require("./APIfunction")
const { getWeather } = require("./APIfunction")
const { getPixabay } = require("./APIfunction")
// const { daysUntill } = require("../client/js/app")

const dotenv = require("dotenv");
dotenv.config();

const app = express()

let projectData ={
    image: null,
    location: null,
    weather: null
}
const port = 8088;
const server = app.listen(port, () => console.log(`Server successfully running on localhost:${port}`));

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('dist'))

console.log(__dirname)

app.get("/", (req, res) => {
    res.sendFile("dist/index.html")
})

app.post("/postLocation", (req, res) => {
    // const days = daysUntill();
    let newLocation = req.body.location
    getGeonames(geonamesUrl,newLocation,process.env.geonames_USERNAME)
    .then((geoData) => {
        const countryName = (geoData.geonames[0].countryName);
        const theCity = (geoData.geonames[0].name);
        const lat = (geoData.geonames[0].lat);
        const long = (geoData.geonames[0].lng);
        const newLatLong = (`&lat=${lat}&lon=${long}`);

        projectData.location = {
            city: theCity,
            country: countryName,
            daysuntill: days
        }

        return {
            newLatLong,
            countryName
        }
    }).catch((error) => {
        console.log(error, "getGeonames error!")    
    }).then((res) => {
        getWeather(weatherUrl,res.newLatLong,process.env.weatherbit_KEY)
        .then((weatherData) => {
            const temperature = Math.round(weatherData.data[0].temp);
            const weatherDescription = (weatherData.data[0].weather);
            
            projectData.weather = {
                weather: weatherDescription.description,
                temp: temperature
            }

        }).catch((error) => {
            console.log(error,"getWeather error!");
        })
    }).then((res) => {
        getPixabay(pixaUrl,newLocation,process.env.pixabay_KEY)
        .then((pixaData) => {
            const picture = (pixaData.hits[0].webformatURL);

            projectData.image = {
                pic: picture
            }
            res.send(projectData)
        }).catch((error) => {
            console.log(error, "getPixabay error!")
        })

    })
})