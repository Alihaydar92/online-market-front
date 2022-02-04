import React, { useState } from "react";
import { Form, Input, Button } from "antd";
export default function Login({Login,error}) {
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [isLogged,setIsLogged]=useState(false);

const [details,setDetails]=useState({username:"",password:""})

  const submitHandler =e=>{

  }
  return (
    <div>
      <Form
     
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
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
          <Button type="primary" htmlType="submit"  onSubmit={submitHandler}>
            Daxil ol
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
