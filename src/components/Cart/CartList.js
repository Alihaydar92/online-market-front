import React, { useEffect, useState } from "react";
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
  Image,
  Button,
  Col,
} from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { getCustomerListByExpeditorId } from "../../redux/actions/customerAction";
import { getProductListByCategoryId } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
const logo = require("../../helpers/greenStreamImg.jpeg");
const { Option } = Select;
export default function CartList() {
  const dispatch = useDispatch();
  const [topForm] = Form.useForm();
  const [basketData, setBasketData] = useState([
    {
      id: Number(),
      name: "",
      quantity: Number(),
      index: Number(),
    },
  ]);
  const [countData, setCountdata] = useState([
    { index: Number(), countState: Number() },
  ]);
  const [listItems, setListItems] = useState([{}]);
  useEffect(() => {
    dispatch(listOfCategories());
  }, []);

  useEffect(() => {
    dispatch(getCustomerListByExpeditorId());
  }, []);

  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers?.categoryListData
  );
  const listOfProductDataByCategoryId = useSelector(
    (state) => state.productReducers?.productListDataByCategoryId
  );
  useEffect(() => {
    setListItems(listOfProductDataByCategoryId);
  }, [listOfProductDataByCategoryId]);
  const listOfCustomerByExpeditorId = useSelector(
    (state) => state.customerReducer?.customerDataListByExpeditorId
  );

  const onChangeCategory = (value) => {
    dispatch(getProductListByCategoryId(value));

    // setListItems(listOfProductDataByCategoryId);
    console.log(listOfProductDataByCategoryId);
  };

  function handleCountChange(count, itemIndex) {
    // setCountdata(
    //   countData.map((x) => {
    //     if (x.index !== itemIndex) return x;
    //     return { ...x, countState: count };
    //   })
    // );
    // console.log(countData);
  }

  const handleToggleComplete = (productItem, itemIndex) => {
    // let filteredData = setBasketData([
    //   ...basketData,
    //   { id: productItem.id, name: productItem.name, index: itemIndex },
    // ]);
    // console.log(basketData);
    //  setBasketData({name:productItem.name,id:productItem.id,index:itemIndex})
    //  console.log('handle button click data: ',basketData)
  };
  return (
    <div>
      <Col span={6} offset={8}>
        <Form
          form={topForm}
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          autoComplete="off"
          // onFinish={handleFinish}
        >
          <Form.Item
            label="Kateqoriya"
            name="category"
            rules={[{ required: true, message: "Kateqoriyani seçin!" }]}
          >
            <Select
              // style={{ width: "300px" }}
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
              style={{ width: "300px" }}
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
        </Form>

        {listOfProductDataByCategoryId.map((item, index) => {
          return (
            <div className="site-card-wrapper">
              <Card>
                {item.productImageDtos.map((value) => {
                  return (
                    <Image
                      width={250}
                      preview={false}
                      alt="logo"
                      // src={String(logo)}
                      src={`data:image/jpeg;base64,${value.content}`}
                    />
                  );
                })}

                <Row>
                  <h4>Məhsul: {item.name}</h4>
                </Row>
                <Row>
                  <h4>Say: </h4>
                  <InputNumber
                    onChange={(e) => handleCountChange(e, index)}
                    defaultValue={1}
                    min={0}
                  ></InputNumber>
                  <span
                    style={{
                      textDecoration: item.isComplete ? "line-through" : "none",
                    }}
                  ></span>
                  <Button
                    type="submit"
                    htmlType="submit"
                    onClick={() => handleToggleComplete(item, index)}
                  >
                    {item.isComplete ? "Səbətdən sil" : "Səbətə əlavə et"}
                  </Button>
                </Row>
              </Card>
            </div>
          );
        })}

        {/* <List
        grid={{
          gutter: 16,
          column: 1,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 6,
          // xxl: 3,
        }}
        dataSource={listItems}
        renderItem={(item, index) => (
          <List.Item style={{ width: "300px" }}>
            
          </List.Item>
        )}
      /> */}
      </Col>
    </div>
  );
}
