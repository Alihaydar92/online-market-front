import React, { useEffect, useState } from "react";
import { Card, Select, Row, Form, InputNumber, Image, Button, Col } from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { addCart } from "../../redux/actions/cartActions";
import { getCustomerListByExpeditorId } from "../../redux/actions/customerAction";
import { getProductListByCategoryId } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { BellFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
const logo = require("../../helpers/no-image.png");

const { Option } = Select;
export default function CartList() {
  const dispatch = useDispatch();
  const [topForm] = Form.useForm();
  // const [countValue, setCountValue] = useState();
  const [customerId, setCustomerId] = useState(Number());
  const [basketData, setBasketData] = useState([
    {
      id: Number(),
      name: "",
      quantity: Number(),
      index: Number(),
    },
  ]);
  // const [countDataList, setCountDataList] = useState([
  //   { id: Number(), countState: Number() },
  // ]);

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
  var countDataList = [];
  const onChangeCategory = (value) => {
    // setCountValue(0);
    dispatch(getProductListByCategoryId(value));
    // setListItems(listOfProductDataByCategoryId);

    console.log(listOfProductDataByCategoryId);
  };
  const onChangeCustomer = (value) => {
    setCustomerId(value);
  };
  var countDataJS = null;

  function handleCountChange(count, item) {
    // setCountValue(count)
    countDataJS = new Object();
    countDataJS.id = item.id;
    countDataJS.countState = count;

    const i = countDataList.findIndex((_element) => _element.id === item.id);
    if (i > -1) {
      countDataList[i] = countDataJS;
    } else {
      countDataList.push(countDataJS);
    }

    console.log(countDataList);
    console.log(countDataJS);
  }
  var items = [];

  const handleToggleComplete = (productItem) => {
    console.log(countDataList);
    console.log(productItem.price);

    var productItemJs = { quantity: 0, productDto: { id: 0, price: 0 } }; //umumi cart add-a gondereceyim data
    var basketItemJs = new Object(); //yalniz seller ve cistomer id yigacagim data

    productItemJs.productDto.id = productItem.id;
    productItemJs.productDto.price = 0; //heleki 0 gonderilir sonra duzelecek

    basketItemJs.sellerId = 6;
    basketItemJs.customerId = customerId;

    for (var i = 0; i < countDataList.length; i++) {
      console.log(countDataList[i].id);
      console.log(productItem.id);
      if (countDataList[i].id === productItem.id) {
        productItemJs.quantity = countDataList[i].countState;
        console.log("productItemJs.count ", productItemJs.count);
        console.log("countDataJS[i].count ", countDataList[i].countState);

        const o = items.findIndex(
          (_element) => _element.id === productItemJs.productDto.id
        );
        if (o > -1) {
          items[o] = productItemJs;
        } else {
          items.push(productItemJs);
        }
      }
    }

    console.log(productItemJs);
    console.log(items);
    basketItemJs["items"] = items;

    console.log(basketItemJs);
    dispatch(addCart(basketItemJs));
  };
  return (
    <div>
      <Button>
        <Link to="/sebet">Sebete get</Link>
      </Button>
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
              onChange={onChangeCustomer}
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
                {item.productImageDtos.length === 0 ? (
                  <Image
                    width={250}
                    // preview={false}
                    alt="logo"
                    // src={String(logo)}
                    src={String(logo)}
                  />
                ) : (
                  item.productImageDtos.map((value) => {
                    return (
                      <Image
                        width={250}
                        // preview={false}
                        alt="logo"
                        // src={String(logo)}
                        src={
                          value === null
                            ? String(logo)
                            : `data:image/jpeg;base64,${value.content}`
                        }
                      />
                    );
                  })
                )}

                <Row>
                  <h4>Məhsul: {item.name}</h4>
                </Row>
                <Row>
                  {/* <h4>Say: </h4> */}
                  <Form.Item label="Say">
                    <InputNumber
                      onChange={(e) => handleCountChange(e, item)}
                      // onChange={setCountValues}
                      defaultValue={0}
                      min={0}
                      // value={countValue}
                    ></InputNumber>
                  </Form.Item>

                  <span
                    style={{
                      textDecoration: item.isComplete ? "line-through" : "none",
                    }}
                  ></span>
                  <Button
                    type="submit"
                    htmlType="submit"
                    onClick={() => handleToggleComplete(item)}
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
