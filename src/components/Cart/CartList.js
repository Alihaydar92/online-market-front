import React, { useEffect, useState } from "react";
import { Card, Select, Row, Form, InputNumber, Image, Button, Col } from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { getCustomerListByExpeditorId } from "../../redux/actions/customerAction";
import { getProductListByCategoryId } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
const logo = require("../../helpers/no-image.png");
const { Option } = Select;
export default function CartList() {
  const dispatch = useDispatch();
  const [topForm] = Form.useForm();
  const [countValue, setCountValue] = useState();
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
    // setCountValue(1);
   
    dispatch(getProductListByCategoryId(value));
    // setListItems(listOfProductDataByCategoryId);

    console.log(listOfProductDataByCategoryId);
  };
  var countDataJS = null;

  function handleCountChange(count, item) {
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
  var productItems = [];
  const handleToggleComplete = (productItem) => {
    console.log(countDataList);
    var productItemJs = new Object();
    productItemJs.id = productItem.id;
    productItemJs.name = productItem.name;
    for (var i = 0; i < countDataList.length; i++) {
      console.log(countDataList[i].id);
      console.log(productItem.id);
      if ((countDataList[i].id = productItem.id)) {
        productItemJs.count = countDataList[i].countState;
        console.log("productItemJs.count ", productItemJs.count);
        console.log("countDataJS[i].count ", countDataList[i].countState);
        productItems.push(productItemJs);
      }
    }
    console.log(productItemJs);
    console.log(productItems);
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
              
           


                {item.productImageDtos.length===0?  (
                    
                  <Image
                
                    width={250}
                    // preview={false}
                    alt="logo"
                    // src={String(logo)}
                    src={String(logo)}
                  />
                )   :item.productImageDtos.map((value) => {
                  return (
                    
                    <Image
                  
                      width={250}
                      // preview={false}
                      alt="logo"
                      // src={String(logo)}
                      src={value===null?String(logo):`data:image/jpeg;base64,${value.content}`}
                    />
                  );
                })}

                <Row>
                  <h4>Məhsul: {item.name}</h4>
                </Row>
                <Row>
                  <h4>Say: </h4>
                  <InputNumber
                    onChange={(e) => handleCountChange(e, item)}
                    // onChange={setCountValue}
                    defaultValue={1}
                    min={0}
                    value={countValue}
                  ></InputNumber>
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
