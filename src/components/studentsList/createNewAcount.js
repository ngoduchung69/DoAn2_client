import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Icon,
  notification
} from "antd";
import { useMutation } from "@apollo/react-hooks";
import { AddUserMutation } from "../../schema/mutation";
import { StudentsQuery } from "../../schema/query";

const CreateNewAcount = () => {
  const [handleName, setHandleName] = useState();
  const [handleMSSV, setHandleMSSV] = useState();
  const [handleAge, setHandleAge] = useState();
  const [handleTel, setHandleTel] = useState();
  const [visible, setVisible] = useState(false);
  const [addUser] = useMutation(AddUserMutation,
		{
			update(cache, { data }) {
				const { users } = cache.readQuery({ query: StudentsQuery });
				cache.writeQuery({
					query: StudentsQuery,
					data: { users: users.concat([data.addUser]) },
				});
			},
			onCompleted: data => {
				notification.success({
					message: 'Thêm Thành Công',
				})
			}
		}
    );

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        <Icon type="plus" /> Thêm Thành Viên
      </Button>
      <Drawer
        title="Tạo Mới"
        width={720}
        onClose={onClose}
        visible={visible}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Name">
                <Input
                  placeholder="Họ và Tên"
                  onChange={event => setHandleName(event.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="MSSV">
                <Input
                  type="number"
                  placeholder="Mã số sinh viên"
                  onChange={event => {
                    setHandleMSSV(parseInt(event.target.value));
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
              <Form.Item label="age">
                <Input
                  type="number"
                  placeholder="tuổi"
                  onChange={event => {
                    setHandleAge(parseInt(event.target.value));
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="tel">
                <Input
                  type="number"
                  placeholder="số điện thoại"
                  onChange={event => {
                    setHandleTel(parseInt(event.target.value));
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e9e9e9",
              padding: "10px 16px",
              background: "#fff",
              textAlign: "right"
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                addUser({
                  variables: {
                    name: handleName,
                    mssv: handleMSSV,
                    role: false,
                    age:handleAge,
                    tel:handleTel
                  },
                  refetchQueries:[{query:StudentsQuery}]
                });
                onClose()
              }}
              type="primary"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  );
};

export default CreateNewAcount;
