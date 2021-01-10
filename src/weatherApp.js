const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')
const chalk = require('chalk')

/* -------------------------------- Weather app functions logic -------------------------------- */
// This section used to be the code for the command line version of this app

// let input_location = 'Los Angeles'
let input_location = process.argv[2];

// Callback chaining + using return in error handling
try {
    if (!input_location)
        throw chalk.black.bgRed('Error: Location input required');

    geocode(input_location, (err, {longitude, latitude, location} = {}) => {
        if (err)
            return console.log(chalk.black.bgRed(err));
        forecast(longitude, latitude, (err2, { temperature } = {}) => {
            if (err2)
                return console.log(chalk.black.bgRed(err2));
            console.log('The temperature at', chalk.green(location), 'is',
                chalk.green(temperature), 'degree Celsius.');
        });
    });

} catch(e) {
    console.log(chalk.black.bgRed(e));
}

/* ------------------------------ End weather app functions logic ------------------------------ */

/* Modularization of the weather app */

const weatherApp = (input, callback) => {
    geocode(input, (err, {longitude, latitude, location} = {}) => {
        if (err)
            return callback(chalk.black.bgRed(err), undefined);
        forecast(longitude, latitude, (err2, { temperature } = {}) => {
            if (err2)
                return callback(chalk.black.bgRed(err2), undefined);
            return callback(undefined, 'The temperature at ' + chalk.green(location) + ' is ' +
                chalk.green(temperature) + ' degree Celcius.');
        });
    });
}

weatherApp('Moscow', (err, res) => {
    console.log('Weather Module works!', res);
})

module.exports = weatherApp;