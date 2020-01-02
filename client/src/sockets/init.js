import socketIOClient from "socket.io-client";
import { config } from "../utils/config";

const socketInit = () => {
  return socketIOClient(config.endpoint);
};

export default socketInit;
