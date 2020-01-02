const express = require("express");
const http = require("http");

const { onClientDisconnect, onRequestCpuUsage } = require("./sockets/events");

/**EXPRESS */
const app = express();

/** .ENV CONFIG */
const dotenv = require("dotenv");
dotenv.config();

/** HTTP AND CREATE SERVER */
const server = http.createServer(app);

/** SOCKET IO */
const socketIO = require("socket.io")(server);
socketIO.on("connection", socket => {
  console.log("---socket initialise---");

  //on Clinet disconnects
  onClientDisconnect(socket);

  //on Clinet request for CPU Usage
  onRequestCpuUsage(socket);

  socket.on("disconnect", () => {
    console.log("this is so true");
  });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
