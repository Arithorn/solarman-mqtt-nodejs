import { getToken, getStationIds } from "./src/solarman.mjs";
import { processStation } from "./src/processing.mjs";
import config from "config";

const single_run = (stationList) => {
  stationList.forEach(async (stationId, index) => {
    processStation(stationId, index);
  });
};

const refresh_time = config.get("refresh_time");
await getToken();
const stationList = await getStationIds();
single_run(stationList);
var intervalId = setInterval(function () {
  console.log("Checking Data");
  single_run(stationList);
}, refresh_time * 60000);
