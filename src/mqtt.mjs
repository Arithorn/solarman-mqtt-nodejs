import dotenv from "dotenv";
import { connect } from "mqtt"; // import connect from mqtt

dotenv.config();
const { mqtt_broker, mqtt_port, mqtt_topic, mqtt_username, mqtt_password } =
  process.env;
console.log(`Connecting to ${mqtt_broker} on port ${mqtt_port}`);
const client = connect(`mqtt:/${mqtt_broker}:${mqtt_port}/`, {
  username: mqtt_username,
  password: mqtt_password,
  host: mqtt_broker,
  port: mqtt_port,
}); // create a client
client.on("connect", () => {
  console.log("Connected to Broker");
});
client.on("error", (err) => console.log(err));

const sendData = (subtopic, data) => {
  try {
    client.publish(`${mqtt_topic}/${subtopic}`, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};
export { sendData };
