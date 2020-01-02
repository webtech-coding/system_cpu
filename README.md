![cpu_usage_graph](https://user-images.githubusercontent.com/46348451/71667645-a79da380-2d6e-11ea-9f14-fb6adab16b97.PNG)

# System CPU Status

This is an application to visualise host system's CPU usage. The CPU data is computed every 500 milliseconds and represented in a graph.

### Build with

The application is build upon ERN stack - Express, React and Node. Node.js, at backend, computes the host machine's CPU untilisation. The socket.io and socket-client.io initiate the real time communication between Node and React. The cpu usage data from node is received at front-end and the last 100 data is represented in CanvasJS graph.

### Installation

If already running by other applications, close PORT:3000 and PORT:3002. Our application is run on these two ports.

1. Clone or download the project.
2. Navigate to the poject folder from terminal.
3. Run `npm install` to install project dependencies.
4. Navigate inside the client folder. This folder hosts React app. Run `npm install` to install client dependencies.
5. From the root folder run `npm run dev`. This initates the node and react. The node runs on PORT:3002 and client runs on PORT:3000
6. Open http://localhost:3000/ on your browser. The application should now start and you should be able to see you host machine's CPU usage.
7. Alternatively, if you like to start client and server separately, run `npm start` for client and `npm server` for node.

### If Disconnected

If temporarily disconnected, the client side will continuosly reqeust for reconnection. If the reconnection attempt is successful, the data starts to be displayed on graph automatically.

![temporary_diconect](https://user-images.githubusercontent.com/46348451/71667974-e1bb7500-2d6f-11ea-9432-145bc95fb97f.PNG)


If the node at backend does not respond for at 15 attempts requests, or if the server does not recover, the application shuts itself and promts to restart the application.

![permanent](https://user-images.githubusercontent.com/46348451/71668119-568eaf00-2d70-11ea-9adc-3b4ae2508f3d.PNG)

