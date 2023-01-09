const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render('index', { title: 'Weather', name: 'Gourav' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About", name: "Gourav" })
})

app.get("/help", (req, res) => {
    res.render('help', { helpText: "This is help text", title: "Help", name: "Gourav" })
})


app.get("/weather", (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "Please provide address"
        })
    }
    else {
        geoCode(req.query.address, (err, { long, lat } = {}) => {
            if (err) {
                res.send(err)
            }
            else {
                forecast(lat, long, (err, data) => {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.send(data)
                    }
                })
            }
        })
    }
})


app.get("/help/*", (req, res) => {
    res.render('404', { title: '404', errorMessage: "Article on help not found", name: "Gourav" })
})

app.get("*", (req, res) => {
    res.render('404', { title: "404", name: "Gourav", errorMessage: "Page not found" })
})

app.listen(port, () => {
    console.log("Server running on port " + port)
})