import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, InputNumber, Select } from "antd";
import {
  listOfStoreHouse,
  updateStoreHouse,
} from "../../redux/actions/storeHouseActions";

import { listOfProducts } from "../../redux/actions/productActions";

const { Option } = Select;
export default function StoreHouseEdit(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const listOfProductData = useSelector(
    (state) => state.productReducers?.productListData
  );

  const storeHouseDataById = useSelector(
    (state) => state.storeHouseReducers.storeHouseDataById
  );
  useEffect(() => {
    dispatch(listOfStoreHouse());
  }, []);

  useEffect(() => {
    dispatch(listOfProducts());
  }, []);

  const onUpdate = async (e) => {
    console.log("property data: ", form.getFieldsValue().property);
    form
      .validateFields()
      .then((values) => {
        var data = {
          barcode: form.getFieldsValue().barcode,
          productId: form.getFieldValue().product,
          quantity: form.getFieldsValue().quantity,
          price: form.getFieldsValue().price,
          sellPrice: form.getFieldsValue().sellPrice,
          id: storeHouseDataById.id,
        };
        console.log("rpoduct data add: ", data);
        dispatch(updateStoreHouse(data));
        props.handleCancel();
        dispatch(listOfStoreHouse());
      })
      .catch(() => {
        console.log("validate fields");
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      barcode: storeHouseDataById.barcode,
      product: storeHouseDataById?.productId,
      quantity: storeHouseDataById.quantity,
      price: storeHouseDataById.price,
      sellPrice: storeHouseDataById.sellPrice,
    });
  }, [form, storeHouseDataById]);
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
          label="Barkod"
          name="barcode"
          rules={[{ required: true, message: "Barkodu daxil edin!" }]}
        >
          <Input />
        </Form.Item>

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
          label="Kəmiyyət"
          name="quantity"
          rules={[{ required: true, message: "Kəmiyyəti daxil edin!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Məhsul"
          name="product"
          rules={[{ required: true, message: "Məhsulu seçin!" }]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            // onSearch={onSearchCategory}
            filterOption={(input, option) => {
              return (
                option.props.children
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0 ||
                option.props.value
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {listOfProductData.map((productData) => (
              <Option key={productData.id} value={productData.id}>
                {productData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" }}
            onClick={onUpdate}
          >
            Yadda saxla
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
