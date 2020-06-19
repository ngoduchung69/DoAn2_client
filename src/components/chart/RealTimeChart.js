  import React, { useEffect } from "react";
  import Plot from "react-plotly.js";
  import Plotly from "plotly.js";

  const getData = () => {
    return Math.random();
  };

  const RealTimeChart = () => {
    useEffect(() => {
      let cnt = 0;
      Plotly.plot("chart", [
        {
          y: [getData()],
          type: "line",
        },
      ]);
      setInterval(() => {
        Plotly.extendTraces("chart", { y: [[getData()]] }, [0]);
        cnt++;
        if (cnt > 500) {
          Plotly.relayout("chart", {
            xaxis: { range: [cnt - 500, cnt] },
          });
        }
      }, 15);
    }, []);
    return <div id="chart"></div>;
  };

  export default RealTimeChart;
