import React, { useState } from "react";
import { Form, Input, Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
export default function Login({ Login, error }) {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const submitHandler = () => {
    form
      .validateFields()
      .then((values) => {
        if (
          (form.getFieldsValue().username === "admin") &
          (form.getFieldsValue().password === "admin")
        ) {
          navigate("/home");
        } else {
          alert("İstifadəçi adı və ya şifrə yanlışdır");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Form
          form={form}
          // layout="container"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          //   onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="İstifadəçi adı"
            name="username"
            rules={[
              {
                required: true,
                message: "İstifadəçi adını daxil edin!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Şifrə"
            name="password"
            rules={[
              {
                required: true,
                message: "Şifrəni daxil edin",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={submitHandler}>
              Daxil ol
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
}
