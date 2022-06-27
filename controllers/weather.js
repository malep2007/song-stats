const axios = require('axios')
const apiKey = process.env.API_KEY 
const Weather = require('../models/weather')


exports.get_weather_details = async (req, res, next) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lon}&appid=${apiKey}`
    const weather = await axios.get(url)
    const weatherInstance = await Weather.create({
        data: weather.data,
        created_at: Date.now()
    })
    return weatherInstance
}