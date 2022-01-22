import {  useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { addCustomer, listOfCustomers } from "../../redux/actions/customerAction";

export default function CustomerAddEdit(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

 
  const onCreate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name,
          surname: form.getFieldsValue().surname,
          note: form.getFieldsValue().note,
        };

        console.log("on create data", data);
        // setVisibleUpdate(false)
        dispatch(addCustomer(data));
        props.handleCancel();
        dispatch(listOfCustomers());
        console.log("on create data", data);
      })
      .catch((errorInfo) => {
        console.log("validate fields");
      });
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        
        <Form.Item
          label="Müştəri adı"
          name="name"
          rules={[{ required: true, message: "Müştəri adını daxil edin!" }]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Müştəri soyad"
          name="surname"
          rules={[{ required: true, message: "Müştəri soyadını daxil edin!" }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="Qeyd"
          name="note"
          rules={[{ required: false, message: "Qeydi daxil edin!" }]}
        >
          <Input/>
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
