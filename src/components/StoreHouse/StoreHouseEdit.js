import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, InputNumber, Select, DatePicker } from "antd";
import moment from "moment";
import {
  listOfStoreHouse,
  updateStoreHouse,
} from "../../redux/actions/storeHouseActions";

import { listOfProducts } from "../../redux/actions/productActions";

const { Option } = Select;
const { TextArea } = Input;
export default function StoreHouseEdit(props) {
  const dateFormat = "DD.MM.YYYY";

  const dispatch = useDispatch();
  const [addedDateString, setAddedDateString] = useState(
    
  );
  const [addedDateValue, setAddedDateValue] = useState(
   
  );
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
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setAddedDateString(dateString);
    // setAddedDateDate(date);
  };
  const onUpdate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          productId: form.getFieldValue().product,
          quantity: form.getFieldsValue().quantity,
          price: form.getFieldsValue().price,
          sellPrice: form.getFieldsValue().sellPrice,
          customerOfferedPrice: form.getFieldsValue().customerOfferedPrice,
          customerSellPrice: form.getFieldsValue().customerSellPrice,
          note: form.getFieldsValue().note.trim(),
          // addedDate:addedDateValue.format(dateFormat),
          addedDate:moment(form.getFieldsValue().dateAdded).format(dateFormat)  ,
          id: storeHouseDataById.id,
        };
        console.log("rpoduct data add: ", data);
        dispatch(updateStoreHouse(data));
        props.handleCancel();
        dispatch(listOfStoreHouse());
      })
      .catch((err) => {
        console.log("validate fields", err);
      });
      console.log(' added date value on update' ,addedDateValue)
      console.log(' addedDateValue.format(dateFormat) string' ,addedDateValue.format(dateFormat))
  };
  useEffect(()=>{
    setAddedDateValue(moment(storeHouseDataById?.addedDate,dateFormat))
    console.log(addedDateValue);
  },[form,storeHouseDataById])
  useEffect(() => {
    
    form.setFieldsValue({
      product: storeHouseDataById?.productDtos?.id,
      quantity: storeHouseDataById.quantity,
      price: storeHouseDataById.price,
      sellPrice: storeHouseDataById.sellPrice,
      customerOfferedPrice: storeHouseDataById.customerOfferedPrice,
      customerSellPrice: storeHouseDataById.customerSellPrice,
      note: storeHouseDataById.note === null ? "" : storeHouseDataById.note,
      dateAdded:moment(storeHouseDataById?.addedDate,dateFormat)
      // .format(dateFormat)
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
          label="Qiyməti"
          name="price"
          rules={[{ required: false, message: "Qiymətini daxil edin!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Satış qiyməti"
          name="sellPrice"
          rules={[{ required: false, message: "Satış qiymətini daxil edin!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Müştəri satış qiyməti"
          name="customerSellPrice"
          rules={[
            { required: false, message: "Müştəri satış qiymətini daxil edin!" },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Digər qiymətlər"
          name="customerOfferedPrice"
          rules={[{ required: false, message: "Digər qiymətləri daxil edin!" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item
          label="Say"
          name="quantity"
          rules={[{ required: true, message: "Sayı daxil edin!" }]}
        >
          <InputNumber min={0} />
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
        <Form.Item
          label="Daxil olma tarixi"
          type="object"
          name="dateAdded"
          rules={[{ required: true, message: "Tarixi daxil edin!" }]}
        >
          <DatePicker
            onChange={onChange}
            value={addedDateValue}
            // onOk={onChange}
            // defaultValue={moment()}
            format={dateFormat}
          />
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
