const yargs = require("yargs");

const geoCode = require("./utils/geoCode");
const weather = require("./utils/weather");

yargs.version("1.0.0");
yargs.usage("Node Weather App\napp.js -a address");

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

// geoCode
//   .geoCodeAddressPromise(argv.address)
//   .then(address => {
//     console.log(JSON.stringify(address, null, 2));
//     return weather.fetchWeatherPromise(address.lat, address.lng);
//   })
//   .then(weather => console.log(JSON.stringify(weather, null, 2)))
//   .catch(error => console.error(error));

// Implemented via Async / Await

async function getData(address) {
  try {
    let parsedAddress = await geoCode.geoCodeAddressPromise(address);
    let fetchedWeather = await weather.fetchWeatherPromise(
      parsedAddress.lat,
      parsedAddress.lng
    );

    return { address: parsedAddress, weather: fetchedWeather };
  } catch (error) {
    console.error(error);
  }
}

// IIAFE - as an example if we want to later invoke an async function

(async () => {
  let result = await getData(argv.address);
  if (result) {
    console.log(JSON.stringify(result, null, 2));
  }
})();
