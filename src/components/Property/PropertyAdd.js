import React from 'react';
import {useDispatch } from "react-redux";
import {Form,Input,Button} from "antd";
import {listOfProperties,addProperty} from "../../redux/actions/propertyActions"
export default function PropertyAdd(props) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();  
    const onCreate = async (e) => {
      form
        .validateFields()
        .then((values) => {
          var data = {
            name: form.getFieldsValue().name,
            // note: form.getFieldsValue().note,
          };
          dispatch(addProperty(data));
          props.handleCancel();
          dispatch(listOfProperties());
        })
        .catch((errorInfo) => {
          console.log("validate fields");
        });
    };
    return (<div>
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
            label="Xüsusiyyət adı"
            name="name"
            rules={[{ required: true, message: "Xüsusiyyət adını daxil edin!" }]}
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
    </div>);
}
