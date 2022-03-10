import React, { useEffect, useState } from "react";
import {
  Card,
  Select,
  Row,
  Form,
  InputNumber,
  Image,
  Col,
  Input,
  Layout,
  Badge,
} from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { addCart } from "../../redux/actions/cartActions";
import { getCustomerListByExpeditorId } from "../../redux/actions/customerAction";
import { getProductListByCategoryId } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Button from "antd-button-color";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "antd-button-color/dist/css/style.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import Cookies from "universal-cookie";
const logo = require("../../helpers/no-image.png");
const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export default function CartList() {

  const dispatch = useDispatch();
  const [topForm] = Form.useForm();
  const [customerId, setCustomerId] = useState(Number());
  const [categoryDisable, setCategoryDisable] = useState(true);
 

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
 
  const listOfCustomerByExpeditorId = useSelector(
    (state) => state.customerReducer?.customerDataListByExpeditorId
  );
useEffect(()=>{
console.log(listOfProductDataByCategoryId)
},[listOfProductDataByCategoryId])



  var countDataList = [];
  var customerSellPriceDataList = [];
  var otherPriceDataList = [];
  const onChangeCategory = (value) => {
    console.log(value)
    topForm
      .validateFields()
      .then(() => {
        dispatch(getProductListByCategoryId(value));

        console.log(listOfProductDataByCategoryId);
       
     
      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeProduct = (e) => {
   
    // var productArrData=[{}];
    // productArrData=listOfProductDataByCategoryId.filter((element)=>{
      
    // return element.id===e;
    // })
   
   
    
  };
  const onChangeCustomer = (value) => {
    setCategoryDisable(false);
    setCustomerId(value);
  };
  var countDataJS = null;
  var customerSellPriceDataJs = null;
  var otherPriceDataJs = null;
  function handleCountChange(count, item) {
    console.log(item);
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
  function handleCustomerSellPriceChange(customerSellPrice, item) {
    console.log(item);
    customerSellPriceDataJs = new Object();
    customerSellPriceDataJs.id = item.id;
    customerSellPriceDataJs.customerSellPrice = customerSellPrice;

    const i = customerSellPriceDataList.findIndex(
      (_element) => _element.id === item.id
    );
    if (i > -1) {
      customerSellPriceDataList[i] = customerSellPriceDataJs;
    } else {
      customerSellPriceDataList.push(customerSellPriceDataJs);
    }

    console.log(customerSellPriceDataList);
    console.log(customerSellPriceDataJs);
  }
  function handleOtherPriceChange(otherPrice, item) {
    console.log(item);
    otherPriceDataJs = new Object();
    otherPriceDataJs.id = item.id;
    otherPriceDataJs.otherPrice = otherPrice;

    const i = otherPriceDataList.findIndex(
      (_element) => _element.id === item.id
    );
    if (i > -1) {
      otherPriceDataList[i] = otherPriceDataJs;
    } else {
      otherPriceDataList.push(otherPriceDataJs);
    }

    console.log(otherPriceDataList);
    console.log(otherPriceDataJs);
  }
  var items = []; //quantity, price ve product id data list

  const handleToggleComplete = (productItem) => {
    console.log(countDataList.length);
    console.log(items);
    if (countDataList.length === 0) return; //eger mehsulun sayi secilmeyibse o zaman elave etmesin
    console.log(countDataList);

    var productItemJs = {
      quantity: 0,
      storeHouseDto: { id: 0 },
      customerSellPrice: 0,
      otherPrice: 0,
    }; //yalniz itemsi yigacagim obj
    var basketItemJs = new Object(); //umumi cart add-a gondereceyim data

    productItemJs.storeHouseDto.id = productItem.id;
    // productItemJs.storeHouseDto.price = 0; //heleki 0 gonderilir sonra duzelecek

    basketItemJs.sellerId = 6;
    basketItemJs.customerId = customerId;

    for (var i = 0; i < countDataList.length; i++) {
      console.log(countDataList[i].id);
      console.log(productItem.id);

      if (countDataList[i].id === productItem.id) {
        productItemJs.quantity = countDataList[i].countState;
        console.log("items ", items);
        console.log("productItemJs.quantity ", productItemJs.quantity);
        console.log("countDataJS[i].count ", countDataList[i].countState);
        console.log("countDataJS[i].id ", countDataList[i].id);
        console.log(
          "productItemJs.storeHouseDto.id ",
          productItemJs.storeHouseDto.id
        );
        const o = items.findIndex(
          (_element) =>
            _element.storeHouseDto.id === productItemJs.storeHouseDto.id
        );

        if (o > -1) {
          items[o] = productItemJs;
          console.log("o ? ", o);
        } else {
          items.push(productItemJs);
          console.log("o ? ", o);
        }
      }
    }
    // for (var i = 0; i < customerSellPriceDataList.length; i++) {
    //   console.log(customerSellPriceDataList[i].id);
    //   console.log(productItem.id);
    //   if (customerSellPriceDataList[i].id === productItem.id) {
    //     productItemJs.customerSellPrice =
    //       customerSellPriceDataList[i].customerSellPrice;

    //     console.log("productItemJs.quantity ", productItemJs.customerSellPrice);
    //     console.log(
    //       "customerSellPriceDataList[i].customerSellPriceDataList ",
    //       customerSellPriceDataList[i].customerSellPrice
    //     );
    //     console.log(
    //       "customerSellPriceDataList[i].id ",
    //       customerSellPriceDataList[i].id
    //     );
    //     console.log(
    //       "productItemJs.storeHouseDto.id ",
    //       productItemJs.storeHouseDto.id
    //     );

    //     const o = items.findIndex(
    //       (_element) => _element.id === productItemJs.storeHouseDto.id
    //     );
    //     console.log("o ? ", o);
    //     if (o > -1) {
    //       items[o] = productItemJs;
    //     } else {
    //       items.push(productItemJs);
    //     }
    //   }
    // }

    // for (var i = 0; i < otherPriceDataList.length; i++) {
    //   console.log(otherPriceDataList[i].id);

    //   console.log(productItem.id);
    //   if (otherPriceDataList[i].id === productItem.id) {
    //     productItemJs.otherPrice = otherPriceDataList[i].otherPrice;
    //     console.log("productItemJs.otherPrice ", productItemJs.otherPrice);
    //     console.log(
    //       "otherPriceDataList[i].count ",
    //       otherPriceDataList[i].otherPrice
    //     );
    //     console.log("otherPriceDataList[i].id ", countDataList[i].id);
    //     console.log(
    //       "productItemJs.storeHouseDto.id ",
    //       productItemJs.storeHouseDto.id
    //     );

    //     const o = items.findIndex(
    //       (_element) => _element.id === productItemJs.storeHouseDto.id
    //     );
    //     console.log("o ? ", o);
    //     if (o > -1) {
    //       items[o] = productItemJs;
    //     } else {
    //       items.push(productItemJs);
    //     }
    //   }
    // }

    console.log(productItemJs); //bunu tek tek gondermek lazimdi(Teyyubla danis)
    console.log(items);
    // basketItemJs["items"] = items;
    basketItemJs["itemForAdd"] = productItemJs;

    console.log(basketItemJs);
    dispatch(addCart(basketItemJs));
  };
  return (
    <div>
      <Row style={{ marginTop: "20px" }}>
        <Col span={5} offset={8}>
          <Form
            form={topForm}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            // onFinish={handleFinish}
          >
            <Form.Item
              label="Müştəri"
              name="customer"
              rules={[{ required: true, message: "Müştərini seçin!" }]}
            >
              <Select
                onChange={onChangeCustomer}
                // style={{ width: "300px" }}
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
            <Form.Item
              label="Kateqoriya"
              name="category"
              rules={[{ required: true, message: "Kateqoriyani seçin!" }]}
            >
              <Select
                disabled={categoryDisable}
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
              label="Məhsul"
              name="product"
              // rules={[{ required: true, message: "Məhsulu seçin!" }]}
            >
              
              <Select
                // disabled={categoryDisable}
                // style={{ width: "300px" }}
                onChange={onChangeProduct}
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
                {listOfProductDataByCategoryId.map((productData) => (
                  <Option key={productData.id} value={productData.id}>
                    {productData.name + "(" + productData.barcode + ")"}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          {listOfProductDataByCategoryId.map((item, index) => {
            return (
              <div className="site-card-wrapper">
                <Card style={{ marginTop: "10px" }}>
                  {item.content === "" ? (
                    <Image
                      width="100%"
                      preview={false}
                      alt="logo"
                      // src={String(logo)}
                      src={String(logo)}
                    />
                  ) : (
                    // item.productImageDtos.map((value) => {
                      // return (
                        <Image
                          width="100%"
                          // preview={false}
                          alt="logo"
                          // src={String(logo)}
                          src={
                            // value === null
                            //   ? String(logo)
                            //   :
                            `data:image/jpeg;base64,${item.content}`
                          }
                        />
                      // );
                    // })
                  )}

                  <Row>
                    <h4>Məhsul: {item.name}</h4>
                  </Row>
                  <Row>
                    <h4>
                      Anbardakı sayı:{" "}
                      <b style={{ color: "red" }}>{item.quantity}</b>
                    </h4>
                  </Row>
                  <Row>
                    <h4>
                      Qiymət:{" "}
                      <b style={{ color: "red" }}>{item.sellPrice + " AZN"}</b>{" "}
                    </h4>
                  </Row>
                  <Form
                    form={topForm}
                    name="priceForm"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    // onFinish={handleFinish}
                  >
                    <Form.Item label="Say">
                      <InputNumber
                        onChange={(e) => handleCountChange(e, item)}
                        // onChange={setCountValues}
                        defaultValue={0}
                        min={0}
                        // value={countValue}
                      ></InputNumber>
                    </Form.Item>

                    {/* <h4>Say: </h4> */}

                    <Form.Item label="Digər qiymətlər">
                      <InputNumber
                        onChange={(e) => handleOtherPriceChange(e, item)}
                        // onChange={setCountValues}
                        defaultValue={0}
                        min={0}
                        // value={countValue}
                      ></InputNumber>
                    </Form.Item>

                    <Form.Item label="Müştəri satış qiyməti">
                      <InputNumber
                        onChange={(e) => handleCustomerSellPriceChange(e, item)}
                        // onChange={setCountValues}
                        defaultValue={0}
                        min={0}
                        // value={countValue}
                      ></InputNumber>
                    </Form.Item>
                  </Form>

                  <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button
                      style={{ marginLeft: "20px" }}
                      type="warning"
                      htmlType="submit"
                      onClick={() => handleToggleComplete(item)}
                    >
                      {item.isComplete ? "Səbətdən sil" : "Səbətə əlavə et"}
                    </Button>
                  </Form.Item>
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
      </Row>
    </div>
  );
}
