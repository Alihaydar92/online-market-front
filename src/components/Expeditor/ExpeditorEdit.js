import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { updateExpeditor,listOfExpeditors } from "../../redux/actions/expeditorActions";

export default function CustomerAddEdit(props) {
  const dispatch = useDispatch();
  const expeditorDataById = useSelector(
    (state) => state.expeditorReducers?.expeditorDataById
  );
  const [form] = Form.useForm();
  const listOfExpeditorData = useSelector((state) => state.expeditorReducers.expeditorListData);
  const onUpdate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name,
          surname: form.getFieldsValue().surname,
          note: form.getFieldsValue().note,
          id: expeditorDataById.id
        };
        dispatch(updateExpeditor(data),[listOfExpeditorData]);
        props.handleCancel();
        dispatch(listOfExpeditors());
      })
      .catch((errorInfo) => {
        console.log("validate fields");
      });
  };
  useEffect(() => {
    form.setFieldsValue({
        name: expeditorDataById.name,
          surname: expeditorDataById?.surname,
          note: expeditorDataById?.note,
    })
  },[form,expeditorDataById]);

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={{
        //     remember: true,
        //   name: customerDataById.name,
        //   surname: customerDataById?.surname,
        //   note: customerDataById?.note,
        // }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Əməkdaşın adı"
          name="name"
          rules={[{ required: true, message: "Əməkdaşın adını daxil edin!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Əməkdaşın soyadı"
          name="surname"
          rules={[{ required: true, message: "Əməkdaşın soyadını daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Qeyd"
          name="note"
          rules={[{ required: false, message: "Qeydi daxil edin!" }]}
        >
          <Input />
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
