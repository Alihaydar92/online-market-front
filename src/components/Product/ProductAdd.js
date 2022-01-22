import React, { useEffect } from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
import {
  addCategory,
  listOfCategories,
} from "../../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
export default function ProductAdd() {
  const dispatch = useDispatch();
  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers.categoryListData
  );
  useEffect(() => {
    dispatch(listOfCategories());
  }, []);

  useEffect(() => {
    console.log("listOfCategoryData ", listOfCategoryData);
  });
  return (
    <div>
      <Form
        // form={form}
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
          <InputNumber />
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Müştəri satış qiyməti"
          name="customerSellPrice"
          rules={[
            { required: false, message: "Müştəri satış qiymətini daxil edin!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Digər qiymətlər"
          name="otherPrice"
          rules={[{ required: false, message: "Digər qiymətləri daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kəmiyyət"
          name="quantity"
          rules={[{ required: false, message: "Kəmiyyəti daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kateqoriya"
          name="categoryName"
          rules={[{ required: false, message: "Kateqoriyani seçin!" }]}
        >
          <Select>
            {listOfCategoryData.map((categoryData) => (
              <Option key={categoryData.id} value={categoryData.name}>
                {categoryData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Xüsusiyyət"
          name="propertyName"
          rules={[{ required: false, message: "Xüsusiyyəti seçin!" }]}
        >
          <Select></Select>
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
            // onClick={onCreate}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
