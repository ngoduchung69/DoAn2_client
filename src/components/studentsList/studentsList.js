import React, { Component, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UsersQuery, StudentsQuery } from "./../../schema/query";
import { Table, Divider, Tag, Input, notification, Form, Modal } from "antd";
import "antd/dist/antd.css";
import { DeleteUserMutation, UpdateUserMutation } from "../../schema/mutation";
import CreateNewAcount from "./createNewAcount";
import Edit from "./edit";
import Profile from "./profile";
const { confirm } = Modal;
const showDeleteConfirm = () =>
  confirm({
    title: "Are you sure delete this task?",
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    }
  });

const StudentsList = () => {
  const [handleID, setHandleID] = useState();
  const [profileMSSV, setProfileMSSV] = useState(20161947);
  const [openModal, setOpenModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [deleteUser] = useMutation(DeleteUserMutation);

  const { loading, error, data } = useQuery(StudentsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <CreateNewAcount />
      <Profile
        visible={openProfile}
        mssv={profileMSSV}
        setVisible={setOpenProfile}
      />
      <Edit visible={openModal} setVisible={setOpenModal} edit_id={handleID} />
      <Table
        columns={[
          {
            title: "Họ và Tên",
            dataIndex: "name",
            key: "name",
            render: (text, record) => (
              <a
                onClick={() => {
                  setOpenProfile(true);
                  setProfileMSSV(record.mssv);
                }}
              >
                {text}
              </a>
            )
          },
          {
            title: "Mã số sinh viên",
            dataIndex: "mssv",
            key: "mssv"
          },
          {
            title: "Tuổi",
            dataIndex: "age",
            key: "age"
          },
          {
            title: "Điện thoại",
            dataIndex: "tel",
            key: "tel"
          },
          {
            title: "ID",
            dataIndex: "_id",
            key: "_id"
          },
          {
            title: "action",
            key: "action",
            render: (text, record) => (
              <span>
                <a
                  onClick={() => {
                    setOpenModal(true);
                    setHandleID(record._id);
                    console.log(record._id);
                  }}
                >
                  Sửa
                </a>
                <Divider type="vertical" />
                <a
                  onClick={() =>
                    confirm({
                      title: "Bạn có chắc là muốn xóa không?",
                      content: `${record.name}`,
                      okText: "Yes",
                      okType: "danger",
                      cancelText: "No",
                      onOk() {
                        deleteUser({
                          variables: { _id: record._id }
                          // refetchQueries: [{ query: StudentsQuery }]
                        });
                        window.location.reload();
                      },
                      onCancel() {
                        console.log("Cancel");
                      }
                    })
                  }
                >
                  Xóa
                </a>
              </span>
            )
          }
        ]}
        dataSource={data.students}
      />
    </div>
  );
};

export default StudentsList;
