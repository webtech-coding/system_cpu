## SYSTEM CPU MONITOR

This is an application to visualise host system's CPU usage. The CPU data is computed every 500 millisecond and represented in a graph.

### Techinologies

The application is build upon ERN stack - Express, React and Node. Node.js, at backend, computes the host machine's CPU untilisation. The socket.io and socket-client.io initiate the real time communication between Node and React. The cpu usage data from node is received at front-end and the last 100 data is represented in CanvasJS graph.
