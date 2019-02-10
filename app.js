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

geoCode.geoCodeAddress(argv.address, (error, result) => {
  if (error) {
    console.log(error);
  } else {
    console.log(JSON.stringify(result, null, 2));
    weather.fetchWeather(result.lat, result.lng, (error, weatherResult) => {
      error
        ? console.log(error)
        : console.log(JSON.stringify(weatherResult, null, 2));
    });
  }
});
