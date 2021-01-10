const request = require('request');

// callback parameter: error, data
function forecast(longitude, latitude, callback) {
    const key = 'c4124ec27a2f6902f3ccb038412080c3';
    let url = 'http://api.weatherstack.com/current?access_key='
    + key + '&query=' + latitude + "," + longitude;

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Error: Unable to connect.', undefined);
        } else if(response.body.error) {
            callback('Error: Unable to find location.', undefined);
        } else {
            callback(undefined, response.body.current);
        }
    });
};

// Testing
/*
forecast( -118.2439, 34.0544, (err, data) => {
    console.log(err);
    console.log(data);
});
*/

module.exports = forecast;