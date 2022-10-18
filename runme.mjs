import { getToken, getStationId, getPlantData } from "./src/solarman.js";

const processStation = async (stationId) => {
  const data = await getPlantData(stationId);
  console.log(data);
};
await getToken();
const stationList = await getStationId();
console.log(stationList);
stationList.forEach(async (stationId) => {
  processStation(stationId);
});
