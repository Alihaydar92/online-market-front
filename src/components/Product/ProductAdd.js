import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, InputNumber, Select } from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { listOfProperties } from "../../redux/actions/propertyActions";
import { addProduct,listOfProducts } from "../../redux/actions/productActions";

const { Option } = Select;
export default function ProductAdd(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers.categoryListData
  );

  const listOfPropertyData = useSelector(
    (state) => state.propertyReducers.propertyListData
  );
  useEffect(() => {
    dispatch(listOfCategories());
  }, []);
  useEffect(() => {
    dispatch(listOfProperties());
  }, []);

  const onCreate = async (e) => {
    console.log("property data: ", form.getFieldsValue().property);
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name,
          barcode: form.getFieldsValue().barcode,
          categoryId: form.getFieldsValue().category,
          quantity: form.getFieldsValue().quantity,
          sellPrice: form.getFieldsValue().sellPrice,
          otherPrice: form.getFieldsValue().otherPrice,
          customerSellPrice: form.getFieldsValue().customerSellPrice,
          propertyId: form.getFieldsValue().property,
          note: form.getFieldsValue().note
        };
console.log('rpoduct data add: ',data)
          dispatch(addProduct(data));
          props.handleCancel();
          dispatch(listOfProducts());
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
          label="Məhusulun adı"
          name="name"
          rules={[{ required: true, message: "Məhusulun adını daxil edin!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Barkod"
          name="barcode"
          rules={[{ required: true, message: "Barkodu daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Qeyd"
          name="note"
          rules={[{ required: false, message: "Qeydi daxil edin!" }]}
        >
          <Input />
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
          label="Kateqoriya"
          name="category"
          rules={[{ required: true, message: "Kateqoriyani seçin!" }]}
        >
          <Select>
            {listOfCategoryData.map((categoryData) => (
              <Option key={categoryData.id} value={categoryData.id}>
                {categoryData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Xüsusiyyət"
          name="property"
          rules={[{ required: true, message: "Xüsusiyyəti seçin!" }]}
        >
          <Select>
            {listOfPropertyData.map((propertyData) => (
              <Option key={propertyData.id} value={propertyData.id}>
                {propertyData.name}
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
            onClick={onCreate}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
