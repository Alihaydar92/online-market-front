import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, InputNumber, Select, DatePicker } from "antd";
import moment from "moment";
import {
  addStoreHouse,
  listOfStoreHouse,
} from "../../redux/actions/storeHouseActions";
import { listOfProducts } from "../../redux/actions/productActions";
const { Option } = Select;
const { TextArea } = Input;
export default function StoreHouseAdd(props) {
  const dispatch = useDispatch();
  // const worker = {
  //   addedDate: moment("2020-06-09T12:40:14+0000")
  // };
  
  const [form] = Form.useForm();
  const listOfProductData = useSelector(
    (state) => state.productReducers?.productListData
  );
  useEffect(() => {
    dispatch(listOfProducts());
  }, []);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onCreate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          productId: form.getFieldValue().product,
          quantity: form.getFieldsValue().quantity,
          price: form.getFieldsValue().price,
          sellPrice: form.getFieldsValue().sellPrice,
          otherPrice: form.getFieldsValue().otherPrice,
          customerSellPrice: form.getFieldsValue().customerSellPrice,
          note: form.getFieldsValue().note.trim(),
          addedDate: form.getFieldsValue().addedDate.dateString
        };
        console.log("product data add: ", data);
        dispatch(addStoreHouse(data));
        props.handleCancel();
        form.resetFields();
        dispatch(listOfStoreHouse());
      })
      .catch((err) => {
        console.log("validate fields",err);
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
          label="Say"
          name="quantity"
          rules={[{ required: true, message: "Sayı daxil edin!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Qeyd"
          name="note"
          rules={[{ required: false, message: "Qeydi daxil edin!" }]}
        >
          <TextArea />
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
        <Form.Item  label="Daxil olma tarixi"
        type="object"
          name="addedDate"
          rules={[{ required: false, message: "Tarixi daxil edin!" }]}>
          <DatePicker onChange={onChange} format={"DD.MM.YYYY"}/>
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
