import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import {
  addCategory,
} from "../../redux/actions/categoryActions";

const { TextArea } = Input;
export default function CategoryAdd(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onCreate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name.trim(),
          note: form.getFieldsValue().note.trim(),
        };

        console.log("on create data", data);
        dispatch(addCategory(data));
        props.handleCancel();
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("validate fields errorInfo ", errorInfo);
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      name: "",
      note: "",
    });
  }, [form]);
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
          label="Kateqoriya adı"
          name="name"
          rules={[
            { required: true, message: "Kateqoriya adını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input autoFocus={true} />
        </Form.Item>
        <Form.Item
          label="Qeyd"
          name="note"
          rules={[{ required: false, message: "Qeydi daxil edin!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px",backgroundColor:"#0C9873",borderColor:"#0C9873" }}
            onClick={onCreate}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
