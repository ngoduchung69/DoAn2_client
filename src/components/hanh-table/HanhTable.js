import React, { useEffect } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";

const HanhTable = ({ tableData }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Temperature",
      dataIndex: "temp",
      key: "temp",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];
  return (
    <div>
      <Table dataSource={tableData} columns={columns} />
    </div>
  );
};

export default HanhTable;
