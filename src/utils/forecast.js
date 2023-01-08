//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7a7564724fdacc066a54b6ad47261371&units=metric`
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback({ error: 'Unable to connect' }, undefined)
        }
        else if (body.message) {
            callback(body.message, undefined)
        }
        else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast

