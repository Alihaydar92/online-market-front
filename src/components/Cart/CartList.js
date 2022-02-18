import React, { useEffect } from "react";
import {
  List,
  Card,
  Select,
  Space,
  Input,
  Row,
  Form,
  InputNumber,
  TextArea,
  Image
} from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { getCustomerListByExpeditorId } from "../../redux/actions/customerAction";
import { getProductListByCategoryId } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "antd/lib/checkbox/Checkbox";
const logo = require("../../helpers/greenStreamImg.jpeg");
const { Option } = Select;
export default function CartList() {
  const dispatch = useDispatch();
  const [formProduct] = Form.useForm();
  const [topForm] = Form.useForm();
  useEffect(() => {
    dispatch(listOfCategories());
  }, []);

  useEffect(() => {
    dispatch(getCustomerListByExpeditorId());
  }, []);
  // useEffect(() => {
  //
  // }, []);
  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers?.categoryListData
  );
  const listOfProductDataByCategoryId = useSelector(
    (state) => state.productReducers?.productListDataByCategoryId
  );

  const listOfCustomerByExpeditorId = useSelector(
    (state) => state.customerReducer?.customerDataListByExpeditorId
  );

  useEffect(() => {
    formProduct.setFieldsValue({
      name:
        listOfProductDataByCategoryId?.name === null
          ? ""
          : listOfProductDataByCategoryId?.name,
      barcode:
        listOfProductDataByCategoryId?.barcode === null
          ? ""
          : listOfProductDataByCategoryId?.barcode,
      // category: productDataById?.categoryDto?.id,
      // quantity: productDataById?.quantity,
      // property: productDataById?.propertyDto?.id,
      // note: productDataById?.note === null ? "" : productDataById?.note,
    });
    topForm.setFieldsValue({
      name:
        listOfProductDataByCategoryId?.name === null
          ? ""
          : listOfProductDataByCategoryId?.name,
      barcode:
        listOfProductDataByCategoryId?.barcode === null
          ? ""
          : listOfProductDataByCategoryId?.barcode,
      // category: productDataById?.categoryDto?.id,
      // quantity: productDataById?.quantity,
      // property: productDataById?.propertyDto?.id,
      // note: productDataById?.note === null ? "" : productDataById?.note,
    });
    console.log(
      "listOfProductDataByCategoryId name ",
      listOfProductDataByCategoryId
    );
  }, [topForm, formProduct, listOfProductDataByCategoryId]);
  const onChangeCategory = (value) => {
    dispatch(getProductListByCategoryId(value));
  };
  return (
    <div>
      <Form
        form={topForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="Kateqoriya"
          name="category"
          rules={[{ required: true, message: "Kateqoriyani seçin!" }]}
        >
          <Select
          style={{width:"300px"}}
            onChange={onChangeCategory}
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
          label="Müştəri"
          name="customer"
          rules={[{ required: true, message: "Müştərini seçin!" }]}
        >
          <Select
           style={{width:"300px"}}
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
            {listOfCustomerByExpeditorId.map((customerData) => (
              <Option key={customerData.id} value={customerData.id}>
                {customerData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Məhsulllar">
        <List
        grid={{
          gutter: 16,
          column:1,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 6,
          // xxl: 3,
        }}
        dataSource={listOfProductDataByCategoryId}
        renderItem={(item) => (
          <List.Item style={{width:"300px"}}>
            <Card >
            <Image width={250} alt="logo" src={String(logo)} />
              <Row><h4>Məhsul: {item.name}</h4></Row>
              <Row>
                <h4>Say: </h4> 
                <InputNumber defaultValue={1} min={0}></InputNumber>
                <Checkbox ></Checkbox>
              </Row>
            </Card>
          </List.Item>
        )}
      />
        </Form.Item>
        
      </Form>
    
      
    </div>
  );
}
