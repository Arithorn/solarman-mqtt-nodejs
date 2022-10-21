import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.solarmanpv.com",
});
// instance.interceptors.request.use((request) => {
//   console.log("Starting Request", JSON.stringify(request, null, 2));
//   return request;
// });

export default instance;
