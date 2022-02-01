import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, InputNumber, Select, DatePicker } from "antd";
import moment from "moment";
import { addStoreHouse } from "../../redux/actions/storeHouseActions";
const { Option } = Select;
const { TextArea } = Input;
export default function StoreHouseAdd(props) {
  const dateFormat = "DD.MM.YYYY";
  const [addedDateValue, setAddedDateValue] = useState(moment());
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const listOfProductData = useSelector(
    (state) => state.productReducers?.productListData
  );
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
        };
        console.log('storehouse data' ,data)
        dispatch(addStoreHouse(data));
        props.handleCancel();
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
                {productData.name + ' (' + productData.barcode + ')'}
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
            // onChange={onChange}
            value={addedDateValue}
            // defaultValue={moment()}
            format={dateFormat}
          />
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
