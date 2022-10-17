import { getToken, getStationId } from "./src/solarman.js";

const token = await getToken();
const stationId = await getStationId();
console.log(stationId);
