import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import moment from "moment";
import { updateStoreHouse } from "../../redux/actions/storeHouseActions";

import { listOfProducts } from "../../redux/actions/productActions";

const { Option } = Select;
const { TextArea } = Input;
export default function StoreHouseEdit(props) {
  const dateFormat = "DD.MM.YYYY";

  const dispatch = useDispatch();
  const [addedDateValue, setAddedDateValue] = useState();
  const [form] = Form.useForm();
  const productListData = useSelector(
    (state) => state.productReducers?.productListData
  );
  const storeHouseDataById = useSelector(
    (state) => state.storeHouseReducers?.storeHouseDataById
  );

  useEffect(() => {
    dispatch(listOfProducts());
  }, []);
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
          addedDate: moment(form.getFieldsValue().dateAdded).format(dateFormat),
          isNew: form.getFieldsValue().isNew,
          id: storeHouseDataById?.id,
        };
        console.log("rpoduct data add: ", data);
        dispatch(updateStoreHouse(data));
        props.handleCancel();
      })
      .catch((err) => {
        console.log("validate fields", err);
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      product: storeHouseDataById?.productDto?.id,
      quantity: storeHouseDataById?.quantity,
      price: storeHouseDataById?.price,
      sellPrice: storeHouseDataById?.sellPrice,
      customerOfferedPrice: storeHouseDataById?.customerOfferedPrice,
      customerSellPrice: storeHouseDataById?.customerSellPrice,
      note: storeHouseDataById?.note === null ? "" : storeHouseDataById?.note,
      dateAdded:
        storeHouseDataById?.addedDate === null
          ? moment()
          : moment(storeHouseDataById?.addedDate, dateFormat),
      isNew: storeHouseDataById?.isNew,
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
        autoComplete="off"
      >
        <Form.Item
          label="Qiyməti"
          name="price"
          rules={[{ required: false, message: "Qiymətini daxil edin!" }]}
        >
          <InputNumber min={0} autoFocus={true} />
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
            {productListData.map((productData) => (
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
          <DatePicker value={addedDateValue} format={dateFormat} />
        </Form.Item>
        <Form.Item
          name="isNew"
          label="Yeni"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ position: "absolute", left: "300px", bottom: "-90px",backgroundColor:"#0C9873",borderColor:"#0C9873" }}
            onClick={onUpdate}
          >
            Yadda saxla
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
