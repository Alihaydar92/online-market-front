import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import {updateProperty,listOfProperties} from "../../redux/actions/propertyActions";
const {TextArea} =Input;
export default function PropertyEdit(props) {
    const dispatch = useDispatch();
    const propertyDataById = useSelector(
      (state) => state.propertyReducers.propertyDataById
    );
    const [form] = Form.useForm();
    const onUpdate =  () => {
      form
        .validateFields()
        .then((values) => {
          var data = {
            name: form.getFieldsValue().name,
            // note: form.getFieldsValue().note,
            id: propertyDataById.id
          };
          console.log('update property data',data)
          dispatch(updateProperty(data),[]);
          props.handleCancel();
          // dispatch(listOfProperties());
        })
        .catch((errorInfo) => {
          console.log("validate fields");
        });
    };
    useEffect(() => {
      form.setFieldsValue({
          name: propertyDataById.name,
            // note: propertyDataById?.note
      })
    },[form,propertyDataById]);
  
    return (
      <div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <Form.Item
            label="Xüsusiyyət adı"
            name="name"
            rules={[{ required: true, message: "Xüsusiyyət adını daxil edin!" }]}
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
              style={{ position: "absolute", left: "300px", bottom: "-90px" }}
              onClick={onUpdate}
            >
              Yadda saxla
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
}
