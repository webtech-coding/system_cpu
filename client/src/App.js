import React, { Component, Fragment } from "react";
import socketInit from "./sockets/init";
import Charts from "./components/charts";
import Info from "./components/Info";
import { config } from "./utils/config";
import Spinner from "./components/spinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpuUsage: [],
      status: {
        socketOpen: false,
        disconnected: false,
        appTermination: false
      },
      model: null
    };
    this.timer = 0;
    this.socketInterval = null;
    this.timeoutInterval = null;
  }

  componentDidMount() {
    const socket = socketInit();

    this.socketInterval = setInterval(() => {
      this.requestCpuUsage(socket);
    }, config.requestInterval);

    socket.on("disconnect", error => {
      socket.on("reconnect_attempt", attempt => {
        if (attempt >= config.reconnectionAttempt) {
          this.closeApplication(socket);
        }
      });

      this.setState({
        status: {
          socketOpen: true,
          disconnected: true
        }
      });
    });

    this.timeoutInterval = setInterval(() => {
      this.connectionTimeout(socket);
    }, config.requestInterval);
  }

  requestCpuUsage = socket => {
    socket.emit("requestCpuUsage", data => {
      let newCpuDataUsage = [...this.state.cpuUsage];
      if (socket.connected) {
        if (data) {
          const { usage, model } = data;

          /**KEEP ONLY LAST 100 CPU DATAS */
          if (newCpuDataUsage.length >= 100) {
            newCpuDataUsage.shift();
          }

          newCpuDataUsage = [...newCpuDataUsage, usage.toFixed(2)];

          this.setState({
            status: {
              socketOpen: true,
              disconnected: false
            },
            cpuUsage: newCpuDataUsage,
            model
          });
        }
      }
    });
  };

  connectionTimeout = socket => {
    const { socketOpen } = this.state.status;
    const { requestInterval, connectionTimeout } = config;

    this.timer = this.timer + requestInterval;
    console.log(this.timer);

    if (!socketOpen && !socket.connected) {
      if (this.timer >= connectionTimeout) {
        /**SERVER DID NOT RESPOND - CLOSE THE SOCKET AND REQUEST FOR RESTART */
        this.closeApplication(socket);
      }
    } else {
      clearInterval(this.timeoutInterval);
    }
  };

  closeApplication = socket => {
    this.setState({
      status: {
        appTermination: true,
        socketOpen: false,
        disconnect: false
      }
    });
    socket.close();
    clearInterval(this.timeoutInterval);
    clearInterval(this.socketInterval);
  };

  render() {
    const { socketOpen, disconnected, appTermination } = this.state.status;
    const { cpuUsage, model } = this.state;
    return (
      <Fragment>
        {socketOpen && !disconnected && (
          <Fragment>
            <Charts cpuData={cpuUsage} />
            <Info model={model} />
          </Fragment>
        )}

        {!socketOpen && !appTermination && (
          <Spinner message='Getting data. Please wait ..' />
        )}

        {socketOpen && disconnected && (
          <Spinner message='Temporarily disconnected. Trying to recover. Please hold...' />
        )}
        {appTermination && (
          <Spinner
            message='Application terminated. Server did not respond. Please restart the application.'
            terminate={appTermination}
          />
        )}
      </Fragment>
    );
  }
}

export default App;
