import React, { Component } from "react";
import { chartOptions, config } from "./../../utils/config";

import CanvasJSReact from "./../../utils/lib/canvasjs.react";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Charts extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      usage: 0
    };
    this.mounted = true;
  }
  componentDidMount() {
    if (this.mounted) {
      setInterval(this.updateChart, config.requestInterval);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateChart() {
    const { cpuData } = this.props;

    if (!cpuData) {
      console.log("this is great");
      return;
    }
    chartOptions.data[0].dataPoints = cpuData.map((data, index) => {
      let y = parseFloat(data).toFixed(2) * 100;
      let x = index;
      if (this.mounted) {
        this.setState({ usage: y });
      }

      return { x, y };
    });
    this.chart.render();
  }

  render() {
    return (
      <section className='chart'>
        <div className='chart_title'>System CPU status</div>
        <CanvasJSChart
          options={chartOptions}
          onRef={ref => (this.chart = ref)}
        />
        <div className='chart_info'>
          <div className='chart_percentage'>
            <div className='chart_percentage_text'>Utilisation</div>
            {parseInt(this.state.usage)} %
          </div>
          <div className='chart_updated_text'>
            Calculated every {config.requestInterval} milliseconds
          </div>
        </div>
      </section>
    );
  }
}

export default Charts;
