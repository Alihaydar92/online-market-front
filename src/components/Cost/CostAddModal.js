import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
export default function CostAddModal() {
  const [form] = Form.useForm();
  const onCreateCost = () => {};
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Adı"
          name="name"
          rules={[{ required: true, message: "Adı daxil edin!" }]}
        >
          <Input autoFocus="true" />
        </Form.Item>

        <Form.Item
          label="Məbləğ"
          name="price"
          rules={[{ required: true, message: "Məbləği daxil edin!" }]}
        >
          <InputNumber  pattern="[0-9]*"
          inputmode="numeric" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              position: "absolute",
              left: "320px",
              bottom: "-90px",
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            onClick={onCreateCost}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
