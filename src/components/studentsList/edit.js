import React, { useState } from "react";
import "antd/dist/antd.css";
import { Modal, Button, Input, Form } from "antd";
import { useMutation } from "@apollo/react-hooks";
import { UsersQuery, StudentsQuery } from "./../../schema/query";
import { UpdateUserMutation } from "../../schema/mutation";
import { Formik } from "formik";
import * as Yup from "yup";

const formValidateSchema = Yup.object().shape({
  name: Yup.string().required("không được để trống"),
  mssv: Yup.string().required("không được để trống"),
  age: Yup.string().required("không được để trống"),
  tel: Yup.string().required("không được để trống")
});

const Edit = ({ setVisible, visible, edit_id }) => {
  const [updateUser] = useMutation(UpdateUserMutation);

  return (
    <Formik
      validationSchema={formValidateSchema}
      initialValues={{
        name: "",
        age: "",
        tel: "",
        role: false,
        mssv: ""
      }}
      onSubmit={data => {
        updateUser({
          variables: {
            name: data.name,
            mssv: data.mssv,
            role: false,
            _id: edit_id,
            age: data.age,
            tel: data.tel
          },
          refetchQueries:[{query: StudentsQuery}]
        });
        setVisible(false);
        // window.location.reload();
      }}
      render={({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        setFieldValue
      }) => {
        return (
          <Modal
            title="Thay Đổi Thông Tin"
            visible={visible}
            onCancel={() => setVisible(false)}
            onOk={() => handleSubmit()}
          >
            <Form layout="vertical" hideRequiredMark>
              <Form.Item label="Họ và Tên" required={true}>
                <Input
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="name"
                />
                {errors.name && <div>{errors.name}</div>}
              </Form.Item>
              <Form.Item label="Mã số sinh viên" required={true}>
                <Input
                  type="number"
                  value={values.mssv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="mssv"
                />
                {errors.mssv && <div>{errors.mssv}</div>}
              </Form.Item>
              <Form.Item label="Tuổi" required={true}>
                <Input
                  type="number"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="age"
                />
                {errors.age && <div>{errors.age}</div>}
              </Form.Item>
              <Form.Item label="Số điện thoại" required={true}>
                <Input
                  type="number"
                  value={values.tel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="tel"
                />
                {errors.tel && <div>{errors.tel}</div>}
              </Form.Item>
            </Form>
          </Modal>
        );
      }}
    ></Formik>
  );
};

export default Edit;
