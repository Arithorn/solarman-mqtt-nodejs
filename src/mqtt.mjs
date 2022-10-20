import dotenv from "dotenv";
import { connect } from "mqtt"; // import connect from mqtt

dotenv.config();
const { mqtt_broker, mqtt_port, mqtt_topic, mqtt_username, mqtt_password } =
  process.env;
console.log(`mqtt:/${mqtt_broker}:${mqtt_port}/`);
let client = connect(`mqtt:/${mqtt_broker}:${mqtt_port}/`, {
  username: mqtt_username,
  password: mqtt_password,
  host: mqtt_broker,
  port: mqtt_port,
}); // create a client

client.on("connect", () => {
  console.log("connect flag:" + client.connected);
});
client.on("error", (err) => console.log(err));

const sendData = (subtopic, data) => {
  client.publish(`${mqtt_topic}/${subtopic}`, JSON.stringify(data));
  // const discard = ["code", "msg", "success", "requestId"];
  // for (const key in data) {
  //   if (!discard.includes(key) && String(data[key]) != "null") {
  //     client.publish(`${mqtt_topic}/${subtopic}/${key}`, String(data[key]));
  //   }
  // }
};
export { sendData };
