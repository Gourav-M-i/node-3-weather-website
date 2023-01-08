//converting address to longitude and latitude using callback
const request = require('request')
const geoCode = (address, callback) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)}&limit=2&appid=7a7564724fdacc066a54b6ad47261371`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback({ error: "Unable to connent" }, undefined)
        }
        else if (response.body.length === 0) {
            callback({ error: "City name not found" }, undefined)
        }
        else {
            callback(undefined, { long: response.body[0].lon, lat: response.body[0].lat })
        }
    })
}

module.exports = geoCode