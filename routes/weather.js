const express = require('express');
const router = express.Router()

const weather_controller = require('../controllers/weather')

router.get('/', weather_controller.get_weather_details)

module.exports = router;