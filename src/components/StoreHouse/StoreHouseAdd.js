import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, InputNumber, Select } from "antd";
import {
  addStoreHouse,
  listOfStoreHouse,
} from "../../redux/actions/storeHouseActions";
import { listOfProducts } from "../../redux/actions/productActions";
const { Option } = Select;
export default function StoreHouseAdd(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const listOfProductData = useSelector(
    (state) => state.productReducers?.productListData
  );
  useEffect(() => {
    dispatch(listOfProducts());
  }, []);

  const onCreate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          barcode: form.getFieldsValue().barcode,
          productId: form.getFieldValue().product,
          quantity: form.getFieldsValue().quantity,
          price: form.getFieldsValue().price,
          sellPrice: form.getFieldsValue().sellPrice,
        };
        console.log("rpoduct data add: ", data);
        dispatch(addStoreHouse(data));
        props.handleCancel();
        dispatch(listOfStoreHouse());
      })
      .catch(() => {
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
            onClick={onCreate}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}