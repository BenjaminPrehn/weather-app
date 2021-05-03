const request = require('postman-request');

const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=36fbac23292166c229f6468136d95b3f&query=' + latitude + ',' + longtitude + '&units=m';

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degress out. Todays humidity is: ' + body.current.humidity + '%');
        }
    });
};

module.exports = forecast;