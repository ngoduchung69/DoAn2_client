import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import styled from "styled-components";
import { ADD_USER, ADD_POST } from "../../schema/mutation";
import {
  useMutation,
  useSubscription,
  useQuery,
  useLazyQuery,
} from "@apollo/react-hooks";
import { notification } from "antd";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const CollectionCreateForm = ({
  visible,
  onCreate,
  onCancel,
  displayContent,
  setDisplayContent,
}) => {
  const [spinButton, setSpinButton] = useState(false);
  const [ramdomId, setRamdomId] = useState();
  const [addPost] = useMutation(ADD_POST);
  const [addUser] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      notification.success({
        message: "Thêm Thành Công",
      });
    },
  });
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create New User"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        form.validateFields().then((values) => {
          setSpinButton(false);
          setDisplayContent("");
          onCreate(values);
          form.resetFields();
          // onCancel();
        });
      }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setSpinButton(false);
            setDisplayContent("");
            onCreate(values);
            addUser({
              variables: {
                name: values.name,
                phone: values.phone,
                address: values.address,
                fingerId: ramdomId.toString(),
              },
            });
            form.resetFields();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input type="number" />
        </Form.Item>
        <Button
          type="primary"
          loading={spinButton}
          onClick={() => {
            setSpinButton(true);
            let ramdomId1 = getRandomInt(100);
            addPost({
              variables: {
                message: "{'type':1,'id':" + ramdomId1 + "}",
              },
            });
            setRamdomId(ramdomId1);
          }}
        >
          Add FingerPrint
        </Button>
        <DisplayContent>{displayContent}</DisplayContent>
      </Form>
    </Modal>
  );
};

const DisplayContent = styled.div`
  display: inline;
  color: green;
  margin: 10px;
`;

const HanhSignUp = ({ displayContent, setDisplayContent }) => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Create New User
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        displayContent={displayContent}
        setDisplayContent={setDisplayContent}
      />
    </div>
  );
};

export default HanhSignUp;
