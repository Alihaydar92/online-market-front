import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { updateCustomer } from "../../redux/actions/customerAction";
const { TextArea } = Input;
export default function CustomerEdit(props) {
  const dispatch = useDispatch();
  const customerDataById = useSelector(
    (state) => state.customerReducer?.customerDataById
  );
  const [form] = Form.useForm();
  const listOfCustomerData = useSelector(
    (state) => state.customerReducer?.customerListData
  );
  const onUpdate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name.trim(),
          surname: form.getFieldsValue().surname.trim(),
          note: form.getFieldsValue().note.trim(),
          id: customerDataById?.id,
        };
        dispatch(
          updateCustomer(
            data,
            props.paginationData.page,
            props.paginationData.pageSize
          ),
          [listOfCustomerData]
        );
        props.handleCancel();
      })
      .catch((errorInfo) => {
        console.log("validate fields");
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      name: customerDataById?.name === null ? "" : customerDataById?.name,
      surname:
        customerDataById?.surname === null ? "" : customerDataById?.surname,
      note: customerDataById?.note === null ? "" : customerDataById?.note,
    });
  }, [form, customerDataById]);
  useEffect(() => {}, [customerDataById]);
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
          label="Müştərinin adı"
          name="name"
          rules={[
            { required: true, message: "Müştərinin adını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input autoFocus="true" />
        </Form.Item>

        <Form.Item
          label="Müştərinin soyad"
          name="surname"
          rules={[
            { required: true, message: "Müştərinin soyadını daxil edin!" },
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
            type="primary"
            htmlType="submit"
            style={{
              position: "absolute",
              left: "320px",
              bottom: "-90px",
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            onClick={onUpdate}
          >
            Yadda saxla
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
