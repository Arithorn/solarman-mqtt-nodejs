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

const getStationId = async () => {
  const result = await api.post(`/station/v1.0/list`, { size: 20, page: 1 });
  const { stationList } = result.data;
  const { id } = stationList[process.env.stationNumber];
  return id;
};

module.exports = { getToken, getStationId };
