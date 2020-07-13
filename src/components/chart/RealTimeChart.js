import React, { useEffect, useState } from "react";
import Plotly from "plotly.js";
import { SUBSCRIPTION } from "../../schema/subscription";
import { useMutation, useSubscription, useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import { Table } from "antd";

const { Column, ColumnGroup } = Table;

const RealTimeChart = () => {
  const [cnt, setCnt] = useState(0);
  const [dataInput1, setDataInput1] = useState([]);
  const { data2, loading2 } = useSubscription(SUBSCRIPTION, {
    onSubscriptionData: (data1) => {
      let jsonString = data1.subscriptionData.data.postAdded;
      console.log(jsonString);

      let content = jsonString.replace(/'/g, '"');
      let a = JSON.parse(content);
      console.log(a);
      // setValue(a.value)
      setCnt((preCnt) => preCnt + 1);
      console.log("cnt", cnt);
      if (cnt > 100) {
        Plotly.relayout("volume", {
          xaxis: { range: [cnt - 100, cnt] },
        });
        Plotly.relayout("accel", {
          xaxis: { range: [cnt - 100, cnt] },
        });
        Plotly.relayout("color", {
          xaxis: { range: [cnt - 100, cnt] },
        });
      }
      if (a) {
        var arrayData1 = [];
        arrayData1.push(a);
        setDataInput1([...arrayData1]);

        Plotly.extendTraces(
          "color",
          {
            y: [
              [Number(a.color.red)],
              [Number(a.color.blue)],
              [Number(a.color.green)],
            ],
          },
          [0, 1, 2]
        );
        Plotly.extendTraces(
          "accel",
          {
            y: [[Number(a.accel.x)], [Number(a.accel.y)], [Number(a.accel.z)]],
          },
          [0, 1, 2]
        );
        Plotly.extendTraces("volume", { y: [[Number(a.volume)]] }, [0]);
      }
    },
  });
  useEffect(() => {
    Plotly.plot("color", [
      {
        y: [1],
        type: "line",
        marker: {
          color: "red",
        },
      },
      {
        y: [2],
        type: "line",
        marker: {
          color: "blue",
        },
      },
      {
        y: [3],
        type: "line",
        marker: {
          color: "yellow",
        },
      },
    ]);
    Plotly.plot("accel", [
      {
        y: [1],
        type: "line",
        marker: {
          color: "red",
        },
      },
      {
        y: [2],
        type: "line",
        marker: {
          color: "blue",
        },
      },
      {
        y: [3],
        type: "line",
        marker: {
          color: "yellow",
        },
      },
    ]);
    Plotly.plot("volume", [
      {
        y: [1],
        type: "line",
        marker: {
          color: "red",
        },
      },
    ]);
  }, []);
  return (
    <Cover>
      <Table
        bordered={true}
        dataSource={
          dataInput1 || {
            accel: { x: 1, y: 1, z: 1 },
            color: { red: 1, green: 1, blue: 1 },
            volume: 1,
          }
        }
      >
        <ColumnGroup title="Color">
          <StyledColumn
            title="Green"
            dataIndex="color"
            align={"center"}
            key="green"
            render={(text) => <DisplayValue>{text.green}</DisplayValue>}
          />
          <StyledColumn
            title="Blue"
            dataIndex="color"
            align={"center"}
            key="Blue"
            render={(text) => <DisplayValue>{text.blue}</DisplayValue>}
          />
          <StyledColumn
            title="Red"
            dataIndex="color"
            align={"center"}
            key="red"
            render={(text) => <DisplayValue>{text.red}</DisplayValue>}
          />
        </ColumnGroup>

        <ColumnGroup title="Accelometer">
          <StyledColumn
            align={"center"}
            title="x"
            dataIndex="accel"
            key="x"
            render={(text) => <DisplayValue>{text.x}</DisplayValue>}
          />
          <StyledColumn
            title="y"
            dataIndex="accel"
            align={"center"}
            key="y"
            render={(text) => <DisplayValue>{text.y}</DisplayValue>}
          />
          <StyledColumn
            title="z"
            dataIndex="accel"
            align={"center"}
            key="z"
            render={(text) => <DisplayValue>{text.z}</DisplayValue>}
          />
        </ColumnGroup>
        <StyledColumn
          align={"center"}
          render={(text) => <DisplayValue>{text}</DisplayValue>}
          title="Microphone"
          dataIndex="volume"
          key="volume"
        />
      </Table>
      <DisplayRow>
        <DisplayArea>
          <div style={{ width: "100%" }} id="accel"></div>
        </DisplayArea>
        <DisplayArea>
          <div style={{ width: "100%" }} id="color"></div>
        </DisplayArea>
      </DisplayRow>

      <div style={{ width: "100%" }} id="volume"></div>
    </Cover>
  );
};

const StyledColumn = styled(Column)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DisplayValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const DisplayNumber = styled.div`
  position: absolute;
  top: 50px;
  /* background-color: red; */
  border: solid 1px gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight: bold;
  font-size: 18px;
  width: 150px;
  height: 30px;
  padding: 5px;
`;

const DisplayRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const DisplayArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const Title = styled.div`
  font-size: 40px;
  opacity: 30%;
  font-weight: bold;
  position: absolute;
  z-index: 1;
  left: 600px;
`;

const Cover = styled.div`
  position: relative;
`;

export default RealTimeChart;
