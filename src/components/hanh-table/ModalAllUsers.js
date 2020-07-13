import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Table } from "antd";
import { GET_ALL_USERS } from "../../schema/query";
import {
  useMutation,
  useSubscription,
  useQuery,
  useLazyQuery,
} from "@apollo/react-hooks";

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
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Action",
    dataIndex: "_id",
    key: "_id",
    render: () => <a>Delete</a>,
  },
];

const ModalAllUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    pollInterval: 1000,
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Open Users Data
      </Button>
      <Modal
        title="Users Data"
        visible={showModal}
        footer={false}
        onCancel={() => setShowModal(false)}
        width={"1000px"}
      >
        <Table dataSource={data.getAllUsers} columns={columns} />
      </Modal>
    </div>
  );
};

export default ModalAllUsers;
