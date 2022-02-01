import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { addExpeditor } from "../../redux/actions/expeditorActions";
const { TextArea } = Input;
export default function ExpeditorAdd(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onCreate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name.trim(),
          surname: form.getFieldsValue().surname.trim(),
          note: form.getFieldsValue().note.trim(),
        };
        console.log("on create data", data);
        dispatch(addExpeditor(data));
        props.handleCancel();
        form.resetFields();
      })
      .catch((errorInfo) => {
        console.log("validate fields", errorInfo);
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
          label="Əməkdaş adı"
          name="name"
          rules={[
            { required: true, message: "Əməkdaş adını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Əməkdaş soyad"
          name="surname"
          rules={[
            { required: true, message: "Əməkdaş soyadını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input />
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
