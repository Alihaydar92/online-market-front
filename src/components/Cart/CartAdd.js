import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, InputNumber, Select } from "antd";
import {listOfCustomers} from "../../redux/actions/customerAction";
import {listOfExpeditors} from "../../redux/actions/expeditorActions";

const {Option} =Select;
export default function CartAdd() {
    const dispatch=useDispatch();

useEffect(()=>{
    dispatch(listOfExpeditors());
});

useEffect(()=>{
    dispatch(listOfCustomers())
})
const customerList =useSelector((state) => state.customerReducer.customerListData)
const expeditorList =useSelector((state)=> state.expeditorReducers.expeditorListData)
  return (
    <div>
      <Form
        // form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
      

        <Form.Item
          label="Qiyməti"
          name="price"
          rules={[{ required: false, message: "Qiymətini daxil edin!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Satış qiyməti"
          name="sellPrice"
          rules={[{ required: false, message: "Satış qiymətini daxil edin!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Müştəri satış qiyməti"
          name="customerSellPrice"
          rules={[
            { required: false, message: "Müştəri satış qiymətini daxil edin!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Digər qiymətlər"
          name="otherPrice"
          rules={[{ required: false, message: "Digər qiymətləri daxil edin!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Kəmiyyət"
          name="quantity"
          rules={[{ required: true, message: "Kəmiyyəti daxil edin!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Müştəri"
          name="category"
          rules={[{ required: true, message: "Müştərini seçin!" }]}
        >
          <Select>
            {customerList.map((customerData) => (
              <Option key={customerData.id} value={customerData.id}>
                {customerData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Ekspeditor"
          name="property"
          rules={[{ required: true, message: "Ekspeditoru seçin!" }]}
        >
          <Select>
            {expeditorList.map((expeditorData) => (
              <Option key={expeditorData.id} value={expeditorData.id}>
                {expeditorData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item
          label="Satış strategiyası"
          name="priceStrategyList[].unitPrice"
          rules={[
            { required: false, message: "Satış strategiyasını daxil edin!" },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" }}
            // onClick={onCreate}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
