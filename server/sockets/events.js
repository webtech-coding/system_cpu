const osUtils = require("os-utils");
const os = require("os");

const onClientDisconnect = socket => {
  socket.on("disconnect", () => {
    console.log("--A clinet has disconnected--");
  });
};

const onRequestCpuUsage = socket => {
  socket.on("requestCpuUsage", sendCpuUsage => {
    let model = os.cpus()[0].model;

    osUtils.cpuUsage(usage => {
      const data = {
        model,
        usage
      };
      return sendCpuUsage(data);
    });
  });
};
module.exports = { onClientDisconnect, onRequestCpuUsage };
