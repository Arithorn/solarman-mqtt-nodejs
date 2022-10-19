import { getToken, getStationIds } from "./src/solarman.js";

import { processStation } from "./src/processing.mjs";

const single_run = (stationList) => {
  stationList.forEach(async (stationId, index) => {
    processStation(stationId, index);
  });
};

await getToken();
const stationList = await getStationIds();
var intervalId = setInterval(function () {
  // call your function here
  console.log("Checking Data");
  single_run(stationList);
}, 60000);
