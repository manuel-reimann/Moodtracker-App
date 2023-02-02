const express = require('express');
const fetch = require('node-fetch')
const Datastore =  require('nedb')
require('dotenv').config()

const app = express()
//TODO: Make port dynamic
const port = process.env.PORT || 3000;



app.listen(port, ()=>{
    console.log(`App started on: http://127.0.00.1:${port}`)
})

app.use(express.static('public'))
app.use(express.json({
    limit: '30mb'
}))


const database = new Datastore('database/database.db')
database.loadDatabase()

app.post('/api', (req,res) => {
    const data = req.body
    console.log(data);
    data.timestamp = Date.now();
    database.insert(data);
    data.sucess = true;
    res.json();
})

app.get('/api', ( req,res ) => {
    //get data from database
    database.find({}, (err, data) => {
        if (err){
            console.error(err)
        }
        else {
            res.json(data)
        }
    })
})

app.get('/weather/:latlon', async (req,res) =>{ 
    const latlon = req.params.latlon.split(',')
    console.log(latlon)

    //Weather Api url data
    const weather_key = process.env.API_KEY_WEATHER;
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlon[0]}&lon=${latlon[1]}&appid=${weather_key}&units=metric`;

    //request weather data
    const weatherResponse = await fetch(weather_url)
    const weatherData = await weatherResponse.json()

    //Air Quality Index API
    const air_key = process.env.API_KEY_AQI;
    const air_url = `https://api.waqi.info/feed/geo:${latlon[0]};${latlon[1]}/?token=${air_key}`
    
    //request Airquality data
    const airResponse = await fetch(air_url)
    const airData = await airResponse.json()
    
    
    console.log(airData)

    const data = {
        weather: weatherData,
        aqi: airData.data.aqi
    }


    res.json(data)
})