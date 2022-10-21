import { getDeviceList, getDeviceData, getPlantData } from "./solarman.mjs";
import { sendData } from "./mqtt.mjs";

const processDeviceData = async (stationName, deviceName, deviceDataList) => {
  const newDataList = {};
  const data = deviceDataList.dataList;
  data.forEach((item) => {
    let key = item.name.replace(/[^a-zA-Z]/g, "_");
    let val = item.value;
    let unit = item.unit == null ? "" : item.unit;
    newDataList[key] = `${val}`;
  });

  let topic = `${stationName}/${deviceName}`;
  sendData(topic, newDataList);
};

const processDevice = async (stationName, device, index) => {
  const { deviceSn, deviceType, connectStatus, deviceId } = device;

  const stateText = ["", "Online", "Alerting", "Offline"];
  const deviceData = await getDeviceData(deviceSn);
  const mqttData = {
    deviceSn,
    deviceId,
    deviceType,
    deviceState: stateText[connectStatus],
  };
  const deviceName = `${deviceType}/${deviceSn}`;
  await processDeviceData(stationName, deviceName, deviceData);
  await sendData(`${stationName}/${deviceName}`, mqttData);
};

const processStation = async (stationId, index) => {
  const plantData = await getPlantData(stationId);
  const stationName = `Station-${index}`;
  sendData(stationName, plantData);
  const { deviceListItems } = await getDeviceList(stationId);
  deviceListItems.forEach(async (device, index) => {
    await processDevice(stationName, device, index);
  });
};

export { processStation };
