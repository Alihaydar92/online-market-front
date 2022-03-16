import { Button, Card, Form, InputNumber, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  storeHouseNumerate,
  storeHouseCountCombo,
} from "../../redux/actions/storeHouseActions";
const { Option } = Select;
export default function Numerate() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(null);
  const [count, setCount] = useState(Number());
  useEffect(() => {
    dispatch(storeHouseCountCombo());
  }, [dispatch]);
  const storeHouseCountComboData = useSelector(
    (state) => state.storeHouseReducers?.storeHouseCountCombo
  );
  useEffect(() => {
    console.log(storeHouseCountComboData);
  }, [storeHouseCountComboData]);
  const onChangeProduct = (e) => {
    console.log(storeHouseCountComboData[e]);
    setProductData(storeHouseCountComboData[e]);
  };

  const onClickAdd = (data) => {
    console.log(data.id);
    console.log(count);
    dispatch(storeHouseNumerate(data, count));
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
            {storeHouseCountComboData.map((productData, index) => (
              <Option value={index} key={index}>
                {productData.productName + "(" + productData.barcode + ")"}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {productData == null ? (
          <p>Məlumat yoxdur</p>
        ) : (
          <Card style={{ width: 300 }}>
            <p>Məhsul: {productData.productName}</p>
            <p>Barkod: {productData.barcode}</p>
            <p>Anbardakı say: {productData.quantity}</p>
            Say:{" "}
            <InputNumber min={0} onChange={(e) => setCount(e)}></InputNumber>
            <Button
              disabled={count <= 0 ? true : false}
              type="primary"
              onClick={() => onClickAdd(productData)}
            >
              Əlavə et
            </Button>
          </Card>
        )}
      </Form>
    </div>
  );
}
