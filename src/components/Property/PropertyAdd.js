import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { addProperty } from "../../redux/actions/propertyActions";
const { TextArea } = Input;
export default function PropertyAdd(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const onCreate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name.trim(),
        };
        dispatch(addProperty(data));
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
          label="Xüsusiyyət adı"
          name="name"
          rules={[
            { required: true, message: "Xüsusiyyət adını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input autoFocus="true" />
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
