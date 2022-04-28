import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addCostType } from "../../redux/actions/costActions";
export default function CostAddModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onCreateCost = () => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: values.name,
        };
        dispatch(addCostType(data));
        props.handleCancel();
        form.resetFields();
      })
      .catch((err) => {});
  };
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
          label="Növü"
          name="name"
          rules={[{ required: true, message: "Növü daxil edin!" }]}
        >
          <Input autoFocus="true" />
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
