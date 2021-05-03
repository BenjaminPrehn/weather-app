const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ben'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ben'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'This is just a help message for you',
        title: 'Help',
        name: 'Ben'
    });
});

app.get("/weather", (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        });
    };

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send( { error }); 
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });

        });
    });
});

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: 'Article not found',
        name: 'Ben'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        error: '404 error page',
        title: '404 error',
        name: 'Ben'
    });
});

app.listen(port, (error) => {
    console.log('Server is running on port: ' + port);
});