import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOfProducts } from "../../redux/actions/productActions";
const { Option } = Select;
export default function Numerate() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOfProducts());
  }, [dispatch]);
  const listOfProductData = useSelector(
    (state) => state.productReducers?.productListData
  );
  useEffect(()=>{
    console.log(listOfProductData)
  },[listOfProductData])
  const onChangeProduct = (value) => {
    console.log(value);
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        layout="horizontal"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        style={{ marginTop: "20px" }}
      >
        <Form.Item
          label="Məhsul"
          name="product"
          rules={[{ required: true, message: "Məhsulu seçin!" }]}
        >
          <Select
            onChange={onChangeProduct}
            showSearch
            optionFilterProp="children"
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
                {productData.name + "(" + productData.barcode + ")"}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}
