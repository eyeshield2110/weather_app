const request = require('request');

// Geocoding (mapbox)

let geo_key = 'pk.eyJ1IjoiaWxsb2dpY2FsZ3VsbCIsImEiOiJja2pvZnR3eXUwaTlpMnprM3BmYzVsbzh2In0.o0QXUXiuvsfBOS4Y800eYA';;

// Use callback pattern for error handling
// The function 'geocode' manipulates the request and 'return' an error or data with callback
function geocode(address, callback) {
    // convert special character to url-symbols (ex. ' ' -> %20)
    address = encodeURIComponent(address);
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address
        + ".json?access_token="
        + geo_key;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Error: Unable to connect to local services.', undefined);
        } else if (response.body.message) {
            callback('Error: Query missing.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Error: Unable to find location.', undefined);
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude:  response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;