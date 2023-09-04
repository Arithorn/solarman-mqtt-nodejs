import api from "./api/solarman.mjs";
import config from "config";

const getToken = async () => {
  try {
    const appid = config.get("appid");
    const secret = config.get("secret");
    const username = config.get("username");
    const passhash = config.get("passhash");
    const orgid = config.get("orgid");
    const result = await api.post(`/account/v1.0/token?appId=${appid}`, {
      appSecret: secret,
      email: username,
      orgId: orgid,
      password: passhash,
    });
    // console.log(result);
    const { access_token } = result.data;
    api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    return access_token;
  } catch (error) {
    console.error(error);
  }
};

const getStationIds = async () => {
  try {
    const result = await api.post(`/station/v1.0/list`, { size: 20, page: 1 });
    const { total, stationList } = result.data;
    // console.log(result);
    let idList = [];
    for (let i = 0; i < total; i++) {
      const { id } = stationList[i];
      idList.push(id);
    }
    return idList;
  } catch (error) {
    console.error(error);
  }
};

const getDeviceList = async (stationId) => {
  try {
    const result = await api.post(`/station/v1.0/device`, { stationId });
    const data = result.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getDeviceData = async (deviceSn) => {
  try {
    const result = await api.post(`/device/v1.0/currentData`, { deviceSn });
    const data = result.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getPlantData = async (stationId) => {
  try {
    const result = await api.post(`/station/v1.0/realTime`, { stationId });
    const data = result.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getToken, getStationIds, getDeviceList, getDeviceData, getPlantData };
