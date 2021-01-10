const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const local_port = 3000;
const heroku_port = process.env.PORT;

/* --------------------------------- Express app configuration --------------------------------- */
const app = express();
app.set('view engine', 'hbs'); // set hbs as template extension (.hbs)
app.set('views', './views'); // access to views (templates)
app.use(express.static(path.join(__dirname, '../public'))); // access to public directory for static assets
hbs.registerPartials(path.join(__dirname, '../views/partials'));

// __dirname is the path directory of the current file (/src)
// --filename is the path of the current file (/src/index.js)

/* ------------------------------- End express app configuration ------------------------------- */

/* -------------------------------- Weather app functions logic -------------------------------- */
// This section used to be the code for the command line version of this app

// Other variables

/* ------------------------------ End weather app functions logic ------------------------------ */

/* -------------------------------------- Express routes -------------------------------------- */
app.get('/', (req, res) => {
    res.render('index', {title: 'Index'});
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About', me: 'me.'});
})

app.get('/help', (req, res) => {
    res.render('help', {title: 'Help'});
})

// ! This route queries an address from the user and fetch the weather at that location
app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({error: 'You must provide an address.'})
    const address = req.query.address
    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if (error)
            return res.send(error)
        forecast(longitude, latitude, (error, {temperature} = {}) => {
            if (error)
                return res.send(error)
            return res.send({location, temperature})
        })
    })

})



// 404 File not found
app.get('/help/*', (req, res) => {
    res.send('<h1>Error 404:</h1> <h2>Help Article Not Found</h2> <p>Go back to <a href="/help">help page</a> </p>');
});

app.get('*', (req, res) => {
    res.send('<h1>Error 404:</h1> <h2>Page Not Found</h2> <p>Go back to <a href="/">main page</a> </p>');
});

port = heroku_port || local_port ;
app.listen(port, () =>{
    console.log('Listening on port', port)
})
/* ------------------------------------- End Express routes ------------------------------------ */

