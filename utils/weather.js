const request = require("request");

const fetchWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/31549a4e1da8dfad96ec438465ceab6c/${lat},${lng}?units=si`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect", undefined);
      } else if (body.code || response.statusCode !== 200) {
        callback(
          "Invalid Location / Server Error: Failed to fetch weather",
          undefined
        );
      } else {
        callback(undefined, body.currently);
      }
    }
  );
};

const fetchWeatherPromise = (lat, lng) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://api.darksky.net/forecast/31549a4e1da8dfad96ec438465ceab6c/${lat},${lng}?units=si`,
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject("Unable to connect");
        } else if (body.code || response.statusCode !== 200) {
          reject("Invalid Location / Server Error");
        } else {
          resolve(body.currently);
        }
      }
    );
  });
};

module.exports = {
  fetchWeather,
  fetchWeatherPromise
};
