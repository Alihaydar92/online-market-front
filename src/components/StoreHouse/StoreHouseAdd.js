import React, { useEffect, useLayoutEffect, useState } from "react";
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
import { addStoreHouse } from "../../redux/actions/storeHouseActions";
import { listOfProducts } from "../../redux/actions/productActions";
const { Option } = Select;
const { TextArea } = Input;
export default function StoreHouseAdd(props) {
  const dateFormat = "DD.MM.YYYY";
  const [addedDateValue, setAddedDateValue] = useState(moment());
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const productListData = useSelector(
    (state) => state.productReducers?.productListData
  );
  useEffect(() => {
    dispatch(listOfProducts());
  }, []);
  useEffect(() => {
    console.log("productListData ", productListData);
  }, [productListData]);
  const onCreate = async (e) => {
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
        };
        console.log("storehouse data", data);
        dispatch(addStoreHouse(data, 1, 15));
        props.handleCancel();
        props.firstPage();
        form.resetFields();
      })
      .catch((err) => {
        console.log("validate fields", err);
      });
  };
  useLayoutEffect(() => {
    form.setFieldsValue({
      dateAdded: addedDateValue,
      productId: "",
      quantity: "",
      price: "",
      sellPrice: "",
      customerOfferedPrice: "",
      customerSellPrice: "",
      note: "",
    });
    console.log("form use layout");
  }, [form]);
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
          <InputNumber pattern="[0-9]*"
        inputmode="numeric" min={0} autoFocus={true} />
        </Form.Item>
        <Form.Item
          label="Satış qiyməti"
          name="sellPrice"
          rules={[{ required: false, message: "Satış qiymətini daxil edin!" }]}
        >
          <InputNumber pattern="[0-9]*"
        inputmode="numeric" min={0} />
        </Form.Item>
        <Form.Item
          label="Müştəri satış qiyməti"
          name="customerSellPrice"
          rules={[
            { required: false, message: "Müştəri satış qiymətini daxil edin!" },
          ]}
        >
          <InputNumber pattern="[0-9]*"
        inputmode="numeric" min={0} />
        </Form.Item>
        <Form.Item
          label="Digər qiymətlər"
          name="customerOfferedPrice"
          rules={[{ required: false, message: "Digər qiymətləri daxil edin!" }]}
        >
          <InputNumber pattern="[0-9]*"
        inputmode="numeric" min={0} />
        </Form.Item>
        <Form.Item
          label="Say"
          name="quantity"
          rules={[{ required: true, message: "Sayı daxil edin!" }]}
        >
          <InputNumber pattern="[0-9]*"
        inputmode="numeric" min={0} />
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
                {productData.name + " (" + productData.barcode + ")"}
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
            style={{ position: "absolute", left: "320px", bottom: "-90px",backgroundColor:"#0C9873",borderColor:"#0C9873" }}
            onClick={onCreate}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
