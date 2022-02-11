import React from "react";
import { Form, Input, Button, Row } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export default function Login() {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const submitHandler = () => {
    form
      .validateFields()
      .then((values) => {
        const axiosInstance = axios.create({
          baseURL: baseURL,
          auth: {
            username: form.getFieldsValue().username,
            password: form.getFieldsValue().password,
          },
        });

        axiosInstance
          .get("/basicauth")
          .then((response) => {
            if (response.status === 200) {
              window.localStorage.setItem(
                "username",
                form.getFieldsValue().username
              );
              window.localStorage.setItem(
                "password",
                form.getFieldsValue().password
              );
              navigate("/home");
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              notification["error"]({
                message: "İstifadəçi adı vəya şifrə yalnışdı",
              });
            }
          });
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
