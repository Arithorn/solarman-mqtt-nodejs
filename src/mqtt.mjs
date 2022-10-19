import dotenv from "dotenv";
import { connect } from "mqtt"; // import connect from mqtt

dotenv.config();
const { mqtt_broker, mqtt_port, mqtt_topic, mqtt_username, mqtt_password } =
  process.env;
let client = connect(`mqtt:/${mqtt_broker}:${mqtt_port}/`); // create a client

client.on("connect", () => {
  console.log("connected to mqtt");
});

const sendData = (subtopic, data) => {
  const discard = ["code", "msg", "success", "requestId"];
  for (const key in data) {
    if (!discard.includes(key) && String(data[key]) != "null") {
      client.publish(`${mqtt_topic}/${subtopic}/${key}`, String(data[key]));
    }
  }
};

export { sendData };
