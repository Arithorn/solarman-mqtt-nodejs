import { getToken, getStationIds } from "./src/solarman.js";
import { processStation } from "./src/processing.mjs";
import dotenv from "dotenv";

const single_run = (stationList) => {
  stationList.forEach(async (stationId, index) => {
    processStation(stationId, index);
  });
};

dotenv.config();
const { refresh_time } = process.env;
await getToken();
const stationList = await getStationIds();
single_run(stationList);
var intervalId = setInterval(function () {
  // call your function here
  console.log("Checking Data");
  single_run(stationList);
}, refresh_time * 60000);
