const yargs = require("yargs");

const geoCode = require("./geoCode/geoCode");

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
  error ? console.log(error) : console.log(JSON.stringify(result, null, 2));
});
