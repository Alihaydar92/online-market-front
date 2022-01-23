import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Select, InputNumber } from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { listOfProperties } from "../../redux/actions/propertyActions";
import {
  listOfProducts,
  updateProduct,
} from "../../redux/actions/productActions";
const { Option } = Select;
export default function ProductEdit(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers.categoryListData
  );

  const listOfPropertyData = useSelector(
    (state) => state.propertyReducers.propertyListData
  );

  const propertyDataById = useSelector(
    (state) => state.propertyReducers.propertyDataById
  );

  const categoryDataById = useSelector(
    (state) => state.categoryReducers.categoryDataById
  );

  const productDataById = useSelector(
    (state) => state.productReducers?.productDataById
  );
  useEffect(() => {
    dispatch(listOfCategories());
  }, []);
  useEffect(() => {
    dispatch(listOfProperties());
  }, []);
  const onUpdate = (e) => {
    form
      .validateFields()
      .then(() => {
        var data = {
          name: form.getFieldsValue().name,
          barcode: form.getFieldsValue().barcode,
          categoryId: form.getFieldsValue().category,
          quantity: form.getFieldsValue().quantity,
          sellPrice: form.getFieldsValue().sellPrice,
          otherPrice: form.getFieldsValue().otherPrice,
          customerSellPrice: form.getFieldsValue().customerSellPrice,
          propertyId: form.getFieldsValue().property,
          note: form.getFieldsValue().note,
          id: productDataById.id,
        };
        dispatch(updateProduct(data));
        props.handleCancel();
        dispatch(listOfProducts());
      })
      .catch((errorInfo) => {
        console.log("validate fields");
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      name: productDataById.name,
      barcode: productDataById.barcode,
      category: productDataById?.categoryDto?.id,
      quantity: productDataById.quantity,
      sellPrice: productDataById.sellPrice,
      otherPrice: productDataById.otherPrice,
      customerSellPrice: productDataById.barcode,
      property: productDataById?.propertyDto?.id,
      note: productDataById.note,
    });
  }, [form, productDataById]);
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // initialValues={{
        //     remember: true,
        //   name: customerDataById.name,
        //   surname: customerDataById?.surname,
        //   note: customerDataById?.note,
        // }}
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
