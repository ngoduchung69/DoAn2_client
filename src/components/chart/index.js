import React, { useMemo, useState, useEffect } from "react";
import {
  TimeSeries,
  TimeRange,
  TimeEvent,
  Pipeline as pipeline,
  Stream,
  EventOut,
  percentile,
  Index,
} from "pondjs";
import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  styler,
  Baseline,
  BarChart,
  ScatterChart,
} from "react-timeseries-charts";
import styled from "styled-components";
import _ from "underscore";
import RealTimeChart from "./RealTimeChart";

class CrossHairs extends React.Component {
  render() {
    const { x, y } = this.props;
    const style = { pointerEvents: "none", stroke: "#ccc" };
    if (!_.isNull(x) && !_.isNull(y)) {
      return (
        <g>
          <line style={style} x1={0} y1={y} x2={this.props.width} y2={y} />
          <line style={style} x1={x} y1={0} x2={x} y2={this.props.height} />
        </g>
      );
    } else {
      return <g />;
    }
  }
}

const Chartsss = ({ data }) => {
  const [realtimeData, setRealtimeData] = useState([]);
  const [toaDo, setToaDo] = useState({ x: 0, y: 0 });

  const fiveMinuteStyle = {
    value: {
      normal: { fill: "#619F3A", opacity: 0.2 },
      highlight: { fill: "619F3A", opacity: 0.5 },
      selected: { fill: "619F3A", opacity: 0.5 },
    },
  };

  const scatterStyle = {
    value: {
      normal: {
        fill: "steelblue",
        opacity: 0.5,
      },
    },
  };

  const colorSeries = new TimeSeries({
    name: "Color",
    columns: ["index", "precip"],
    points: data.lightOnQuery.map((value) => {
      return [Index.getIndexString("1s", new Date(value.time)), value.color];
    }),
  });
  const magneSeries = new TimeSeries({
    name: "Magne",
    columns: ["index", "precip"],
    points: data.lightOnQuery.map((value) => {
      return [Index.getIndexString("1s", new Date(value.time)), value.magne];
    }),
  });
  const microSeries = new TimeSeries({
    name: "Micro",
    columns: ["index", "precip"],
    points: data.lightOnQuery.map((value) => {
      return [Index.getIndexString("1s", new Date(value.time)), value.micro];
    }),
  });
  const accelSeries = new TimeSeries({
    name: "Accel",
    columns: ["index", "x", "y", "z"],
    points: data.lightOnQuery.map((value) => {
      return [
        Index.getIndexString("1s", new Date(value.time)),
        value.accel.x,
        value.accel.y,
        value.accel.z,
      ];
    }),
  });
  const accelStyle = styler([
    {
      key: "x",
      color: "red",
      selected: "#2CB1CF",
      width: 2,
    },
    {
      key: "y",
      color: "blue",
      selected: "#2CB1CF",
      width: 2,
    },
    {
      key: "z",
      color: "orange",
      selected: "#2CB1CF",
      width: 2,
    },
  ]);
  const style = styler([
    {
      key: "precip",
      color: "#A5C8E1",
      selected: "#2CB1CF",
      width: 2,
    },
  ]);
  const handleMouseMove = (x, y) => {
    setToaDo({ ...toaDo, x: x, y: y });
  };

  return (
    <>
      <RealTimeChart />
      <Resizable>
        <ChartContainer
          enablePanZoom={true}
          onMouseMove={(x, y) => handleMouseMove(x, y)}
          timeRange={colorSeries.range()}
          paddingRight={50}
          showGrid={true}
          timeAxisStyle={{
            ticks: {
              stroke: "#AAA",
              opacity: 0.25,
              "stroke-dasharray": "1,1",
              // Note: this isn't in camel case because this is
              // passed into d3's style
            },
            values: {
              fill: "#AAA",
              "font-size": 12,
            },
          }}
        >
          <ChartRow height="150">
            <YAxis
              style={{
                ticks: {
                  stroke: "#AAA",
                  opacity: 0.25,
                  "stroke-dasharray": "1,1",
                  // Note: this isn't in camel case because this is
                  // passed into d3's style
                },
              }}
              id="color"
              label="COLOR"
              min={0}
              max={100}
              format=".2f"
              width="70"
              type="linear"
              showGrid
              hideAxisLine
            />
            <Charts>
              <LineChart
                interpolation="curveBasis"
                axis="color"
                style={style}
                spacing={1}
                columns={["precip"]}
                series={colorSeries}
                minBarHeight={1}
              />
              <Baseline axis="color" value={0} position="right" label="COLOR" />
            </Charts>
          </ChartRow>
          <ChartRow height="150">
            <YAxis
              style={{
                ticks: {
                  stroke: "#AAA",
                  opacity: 0.25,
                  "stroke-dasharray": "1,1",
                  // Note: this isn't in camel case because this is
                  // passed into d3's style
                },
              }}
              id="micro"
              label="MICRO"
              min={0}
              max={100}
              format=".2f"
              width="70"
              type="linear"
              showGrid
              hideAxisLine
            />
            <Charts>
              <LineChart
                interpolation="curveBasis"
                axis="micro"
                style={style}
                spacing={1}
                columns={["precip"]}
                series={microSeries}
                minBarHeight={1}
              />
              <Baseline
                axis="micro"
                value={0}
                position="right"
                label="MICROPHONE"
              />
            </Charts>
          </ChartRow>
          <ChartRow height="150">
            <YAxis
              style={{
                ticks: {
                  stroke: "#AAA",
                  opacity: 0.25,
                  "stroke-dasharray": "1,1",
                  // Note: this isn't in camel case because this is
                  // passed into d3's style
                },
              }}
              id="magne"
              label="MAGNE"
              min={0}
              max={1000}
              format=".2f"
              width="70"
              type="linear"
              showGrid
              hideAxisLine
            />
            <Charts>
              <LineChart
                interpolation="curveBasis"
                axis="magne"
                style={style}
                spacing={1}
                columns={["precip"]}
                series={magneSeries}
                minBarHeight={1}
              />
              <Baseline
                axis="magne"
                value={0}
                label="MAGNETOMETER"
                position="right"
              />
            </Charts>
          </ChartRow>
          <ChartRow height="150">
            <YAxis
              style={{
                ticks: {
                  stroke: "#AAA",
                  opacity: 0.25,
                  "stroke-dasharray": "1,1",
                  // Note: this isn't in camel case because this is
                  // passed into d3's style
                },
              }}
              id="accel"
              label="ACCEL"
              min={0}
              max={10}
              format=".2f"
              width="70"
              type="linear"
              showGrid
              hideAxisLine
            />
            <Charts>
              <LineChart
                interpolation="curveBasis"
                axis="accel"
                style={accelStyle}
                spacing={1}
                columns={["x"]}
                series={accelSeries}
                minBarHeight={1}
              />
              <LineChart
                interpolation="curveBasis"
                axis="accel"
                style={accelStyle}
                spacing={1}
                columns={["y"]}
                series={accelSeries}
                minBarHeight={1}
              />
              <LineChart
                interpolation="curveBasis"
                axis="accel"
                style={accelStyle}
                spacing={1}
                columns={["z"]}
                series={accelSeries}
                minBarHeight={1}
              />
              <CrossHairs x={toaDo.x} y={toaDo.y} />
            </Charts>
          </ChartRow>
        </ChartContainer>
      </Resizable>
      <div style={{ display: "flex" }}>
        <FormDotColor>
          <DotColor color={"red"}></DotColor>
          <div>: x</div>
        </FormDotColor>
        <FormDotColor>
          <DotColor color={"blue"}></DotColor>
          <div>: y</div>
        </FormDotColor>
        <FormDotColor>
          <DotColor color={"orange"}></DotColor>
          <div>: z</div>
        </FormDotColor>
      </div>
    </>
  );
};

const FormDotColor = styled.div`
  display: flex;
  margin: 10px;
`;

const DotColor = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 30%;
  background-color: ${(props) => props.color};
  margin-right: 10px;
  margin-top: 7px;
`;

export default Chartsss;
