const yargs = require("yargs");

const geoCode = require("./geoCode/geoCode");
const weather = require("./weather/weather");

const argv = yargs
  .options({
    address: {
      demand: true,
      describe: "Address for weather info",
      alias: "a",
      string: true
    }
  })
  .help()
  .alias("help", "h").argv;

// Implemented via callbacks

// geoCode.geoCodeAddress(argv.address, (error, result) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(JSON.stringify(result, null, 2));
//     weather.fetchWeather(result.lat, result.lng, (error, weatherResult) => {
//       error
//         ? console.log(error)
//         : console.log(JSON.stringify(weatherResult, null, 2));
//     });
//   }
// });

// Implemented via promise
geoCode
  .geoCodeAddressPromise(argv.address)
  .then(address => {
    console.log(JSON.stringify(address, null, 2));
    return weather.fetchWeatherPromise(address.lat, address.lng);
  })
  .then(weather => console.log(JSON.stringify(weather, null, 2)))
  .catch(error => console.error(error));
