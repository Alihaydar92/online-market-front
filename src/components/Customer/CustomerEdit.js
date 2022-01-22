import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { updateCustomer,listOfCustomers } from "../../redux/actions/customerAction";

export default function CustomerAddEdit(props) {
  const dispatch = useDispatch();
  const customerDataById = useSelector(
    (state) => state.customerReducer.customerDataById
  );
  const [form] = Form.useForm();
  const listOfCustomerData = useSelector((state) => state.customerReducer?.customerListData);
  const onUpdate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name,
          surname: form.getFieldsValue().surname,
          note: form.getFieldsValue().note,
          id: customerDataById.id
        };
        dispatch(updateCustomer(data),[listOfCustomerData]);
        props.handleCancel();
        dispatch(listOfCustomers());
      })
      .catch((errorInfo) => {
        console.log("validate fields");
      });
  };
  useEffect(() => {
    form.setFieldsValue({
        name: customerDataById.name,
          surname: customerDataById?.surname,
          note: customerDataById?.note,
    })
  },[form,customerDataById]);
  // const customerAddreturnData = useSelector(
  //   (state) => state.customerReducer.customerData
  // );

  // useEffect(() => {
  //   dispatch(getCustomerById());
  //   console.log("customerDataById ", customerDataById.name);
  // }, []);
  useEffect(() => {}, [customerDataById]);
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
          label="Müştərinin adı"
          name="name"
          rules={[{ required: true, message: "Müştərinin adını daxil edin!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Müştərinin soyad"
          name="surname"
          rules={[{ required: true, message: "Müştərinin soyadını daxil edin!" }]}
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
