import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import styled from 'styled-components'

const CollectionCreateForm = ({ visible, onCreate, onCancel,displayContent }) => {
    const [spinButton,setSpinButton] = useState(false)
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create New User"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
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
          name="Name"
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
        <Form.Item name="Address" label="Address">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="Phone" label="Phone">
          <Input type="number" />
        </Form.Item>
        <Button
          type="primary"
          loading={spinButton}
          onClick={() => {
            setSpinButton(true)
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
display:inline;
color:green;
margin:10px;
`

const HanhSignUp = ({displayContent}) => {
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
      />
    </div>
  );
};

export default HanhSignUp;
