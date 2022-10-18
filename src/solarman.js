require("dotenv").config();
const api = require("./api/solarman");

const getToken = async () => {
  const { appid, secret, username, passhash, orgid } = process.env;
  const result = await api.post(`/account/v1.0/token?appId=${appid}`, {
    appSecret: secret,
    email: username,
    orgId: orgid,
    password: passhash,
  });
  const { access_token } = result.data;
  api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  return access_token;
};

const getStationIds = async () => {
  const result = await api.post(`/station/v1.0/list`, { size: 20, page: 1 });
  const { total, stationList } = result.data;
  let idList = [];
  for (let i = 0; i < total; i++) {
    const { id } = stationList[process.env.stationNumber];
    idList.push(id);
  }
  return idList;
};

const getPlantData = async (stationId) => {
  const result = await api.post(`/station/v1.0/realTime`, { stationId });
  const data = result.data;
  return data;
};

module.exports = { getToken, getStationId: getStationIds, getPlantData };
