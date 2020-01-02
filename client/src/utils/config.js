const config = {
  endpoint: "localhost:3002",
  requestInterval: 500,
  reconnectionAttempt: 15,
  connectionTimeout: 30 * 1000
};

const chartOptions = {
  animationEnabled: false,
  backgroundColor: "transparent",

  axisX: {
    maximum: 100,
    minimum: 0,
    interval: 25,
    reversed: false,
    stripLines: [
      {
        startValue: 1935,
        endValue: 1945,
        color: "#d8d8d8"
      }
    ],
    lineColor: "#fff",
    color: "#fff",
    gridColor: "#fff",
    gridThickness: 0.1,
    labelFontColor: "#fff",
    labelFontSize: 10
  },
  axisY: {
    title: "CPU utilisation (%)",
    prefix: "",
    includeZero: true,
    maximum: 100,
    lineColor: "#fff",
    color: "#fff",
    gridColor: "#fff",
    gridThickness: 0.1,
    labelFontColor: "#fff",
    labelFontSize: 10,
    titleFontColor: "#fff"
  },
  data: [
    {
      yValueFormatString: "0",
      xValueFormatString: "0",
      type: "splineArea",
      color: "rgba(0,102,255,0.5)",
      markerType: "none",
      dataPoints: []
    }
  ]
};

export { config, chartOptions };
