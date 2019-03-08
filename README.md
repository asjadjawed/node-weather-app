# Node Weather App

A command line smart node weather app. It uses MapQuest Geo Code API to parse addresses (acceptable inputs: full address, zip codes, city names, famous locations, latitude & longitude). It then references Forecast Dark Sky API to fetch current weather for that location.

The app has source code for 3-kinds of asynchronous javascript implementations via callbacks, promises and async await.
It uses async await but functions for any of the above can be swapped in the source code.

Download to use.

To get started type:

<kbd>node app --help</kbd>

Built using:

- Node.js
- yargs
- request
- mapquest API
- darksky API
