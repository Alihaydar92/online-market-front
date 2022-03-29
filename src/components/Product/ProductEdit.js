import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Select } from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { listOfProperties } from "../../redux/actions/propertyActions";
import { updateProduct } from "../../redux/actions/productActions";
const { Option } = Select;
const { TextArea } = Input;
export default function ProductEdit(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers.categoryListData
  );

  const listOfPropertyData = useSelector(
    (state) => state.propertyReducers?.propertyListData
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
          name: form.getFieldsValue().name.trim(),
          barcode: form.getFieldsValue().barcode.trim(),
          categoryId: form.getFieldsValue().category,
          propertyId: form.getFieldsValue().property,
          note: form.getFieldsValue().note.trim(),
          id: productDataById?.id,
        };
        console.log('paginationData : ',props.paginationData)
        dispatch(updateProduct(data,props.paginationData));
        props.handleCancel();
      })
      .catch((errorInfo) => {
        console.log("validate fields");
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      name: productDataById?.name === null ? "" : productDataById?.name,
      barcode:
        productDataById?.barcode === null ? "" : productDataById?.barcode,
      category: productDataById?.categoryDto?.id,
      quantity: productDataById?.quantity,
      property: productDataById?.propertyDto?.id,
      note: productDataById?.note === null ? "" : productDataById?.note,
    });
  }, [form, productDataById]);
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="Məhusulun adı"
          name="name"
          rules={[
            { required: true, message: "Məhusulun adını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input autoFocus="true"/>
        </Form.Item>

        <Form.Item
          label="Barkod"
          name="barcode"
          rules={[
            { required: true, message: "Barkodu daxil edin!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Qeyd"
          name="note"
          rules={[{ required: false, message: "Qeydi daxil edin!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Tip"
          name="category"
          rules={[{ required: true, message: "Tipi seçin!" }]}
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
            {listOfPropertyData.map((propertyData) => (
              <Option key={propertyData.id} value={propertyData.id}>
                {propertyData.name}
              </Option>
            ))}
          </Select>
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
