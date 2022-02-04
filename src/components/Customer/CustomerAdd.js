import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { addCustomer } from "../../redux/actions/customerAction";
const { TextArea } = Input;
export default function CustomerAdd(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onCreate = (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name.trim(),
          surname: form.getFieldsValue().surname.trim(),
          note: form.getFieldsValue().note.trim(),
        };
        console.log("on create data", data);
        dispatch(addCustomer(data));
        props.handleCancel();
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("validate fields");
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      name: "",
      surname: "",
      note: "",
    });
  }, [form]);
  return (
    <div key="add" rowKey="id">
      <Form
        key="add"
        rowKey="id"
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          key="add"
          rowKey="id"
          label="Müştəri adı"
          name="name"
          rules={[
            { required: true, message: "Müştəri adını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input autoFocus="true" />
        </Form.Item>

        <Form.Item
          label="Müştəri soyad"
          name="surname"
          rules={[
            { required: true, message: "Müştəri soyadını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input rowKey="id" key="add" />
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
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" }}
            onClick={onCreate}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
