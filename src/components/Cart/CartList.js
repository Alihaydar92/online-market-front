import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import {
  Card,
  Select,
  Row,
  Form,
  InputNumber,
  Image,
  Col,
  Checkbox,
  Popover,
  Space,
  Input,
  Divider,
} from "antd";
import { ClearOutlined } from "@ant-design/icons";
import {
  listOfProperties,
  getPropertyByCategoryId,
} from "../../redux/actions/propertyActions";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { addCart } from "../../redux/actions/cartActions";
import { getCustomerListByExpeditorId } from "../../redux/actions/customerAction";
import {
  getProductListByPropertyId,
  getProductListByCategoryId,
  getProductListByProAndCatId,
  getProductListByProduct,
  getAllProducts,
  getAllNewProducts,
} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Button from "antd-button-color";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "antd-button-color/dist/css/style.css";
const logo = require("../../helpers/no-img.png");
// const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export default function CartList() {
  const dispatch = useDispatch();
  const [topForm] = Form.useForm();
  const [baseForm] = Form.useForm();
  const [customerId, setCustomerId] = useState(Number());
  const [dataId, setDataId] = useState(Number());
  const [disable, setDisable] = useState(true);
  const [disableForProAndCatCombo, setDisableForProAndCatCombo] =
    useState(true);
  const [disablePropertyCombo, setDisablePropertyCombo] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visibleState, setVisibleState] = useState({ visible: false });
  const [formKey, setFormKey] = useState(Number(0));
  const [cookies, setCookie] = useCookies(["customerCookieId"]);
  const [proId, setProId] = useState(undefined);
  const [catId, setCatId] = useState(undefined);
  const [productParam, setProductParam] = useState();

  const [cartSearchMode, setCartSearchMode] = useState("");
  useEffect(() => {
    // dispatch(listOfProperties());
    dispatch(listOfCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCustomerListByExpeditorId());
  }, [dispatch]);

  useEffect(() => {
    console.log(cookies.customerCookieId);
    baseForm.setFieldsValue({
      customer:
        cookies.customerCookieId === undefined
          ? null
          : Number(cookies.customerCookieId),
    });
    setCustomerId(cookies.customerCookieId);
    setDisable(false);
  }, [baseForm, cookies]);

  const listOfPropertyData = useSelector(
    (state) => state.propertyReducers?.propertyListData
  );
  const propertyDataByCategoryId = useSelector(
    (state) => state.propertyReducers?.propertyListData
  );

  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers?.categoryListData
  );
  const listOfProductDataById = useSelector(
    (state) => state.productReducers?.productListDataById
  );
  const productListTotalPages = useSelector(
    (state) => state.productReducers?.totalPages
  );

  const productListTotalItems = useSelector(
    (state) => state.productReducers?.totalItems
  );
  const currentPage = useSelector(
    (state) => state.productReducers?.currentPage
  );

  const listOfCustomerByExpeditorId = useSelector(
    (state) => state.customerReducer?.customerDataListByExpeditorId
  );

  var countDataList = [];
  var customerSellPriceDataList = [];
  var otherPriceDataList = [];
  const onChangeProperty = (proValue) => {
    setProId(proValue);
    if (proValue === undefined && catId === undefined) {
      setDisableForProAndCatCombo(true);
    } else {
      setDisableForProAndCatCombo(false);
    }
    console.log(proValue);
    // baseForm.resetFields(["category"]);
    setFormKey((formKey || 0) + 1);
    // setDataId(value);
    // dispatch(getProductListByPropertyId(value, 0, true));

    setLoading(false);
  };

  const onChangeCategory = (catValue) => {
    if (catValue === undefined) {
      setDisablePropertyCombo(true);
    } else {
      dispatch(getPropertyByCategoryId(catValue));
      setDisablePropertyCombo(false);
    }
    setCatId(catValue);
    console.log(proId);
    if (catValue === undefined && proId === undefined) {
      setDisableForProAndCatCombo(true);
    } else {
      setDisableForProAndCatCombo(false);
    }

    console.log(catValue);
    // baseForm.resetFields(["property"]);
    console.log("formKey", formKey);
    setFormKey((formKey || 0) + 1);
    // setDataId(value);
    // dispatch(getProductListByCategoryId(value, 0, true));

    setLoading(false);
  };

  const onChangeProduct = (e) => {
    // var productArrData=[{}];
    // productArrData=listOfProductDataBypropertyId.filter((element)=>{
    // return element.id===e;
    // })
  };
  const onChangeCustomer = (value) => {
    setDisable(false);
    setCustomerId(value);
    setCookie("customerCookieId", value);
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

  useEffect(() => {
    var productParam = baseForm.getFieldsValue().product;
    console.log(proId, catId);
    console.log(baseForm.getFieldsValue().product);
    if (cartSearchMode === "new") {
      dispatch(getAllNewProducts(page, false));
    } else if (cartSearchMode === "all") {
      dispatch(getAllProducts(page, false));
    } else {
      if (
        productParam !== "" &&
        productParam !== undefined &&
        productParam !== null
      ) {
        console.log("product param is not empty");
        dispatch(getProductListByProduct(productParam, page, false));
      } else {
        if (proId !== undefined || catId !== undefined) {
          dispatch(getProductListByProAndCatId(proId, catId, page, false));
        }
        console.log("product param is  empty");
      }
    }

    setLoading(false);
  }, [page]);
  const onClickForPropertyAndCategoryCombo = () => {
    baseForm
      .validateFields()
      .then((values) => {
        setProductParam(baseForm.getFieldsValue().product);
        console.log(productParam);
        console.log(proId);
        console.log(catId);
        if (baseForm.getFieldsValue().product !== "") {
          console.log("product param is not empty");
          dispatch(
            getProductListByProduct(baseForm.getFieldsValue().product, 0, true)
          );
        } else {
          console.log("product param is  empty");
          dispatch(getProductListByProAndCatId(proId, catId, 0, true));
        }
        //
      })
      .catch((errorInfo) => {
        console.log("validate fields");
      });
  };

  const onClickNewProducts = () => {
    setPage(0);
    setCartSearchMode("new");
    dispatch(getAllNewProducts(0, true));
  };

  const onClickAllProducts = () => {
    setPage(0);
    setCartSearchMode("all");
    dispatch(getAllProducts(0, true));
  };

  const changeProductInput = (e) => {
    console.log(e.target.value);
    setPage(0);
    baseForm.setFieldsValue({
      category: null,
      property: null,
    });
    if (e.target.value !== "") {
      setDisableForProAndCatCombo(false);
    } else {
      setDisableForProAndCatCombo(true);
    }
  };

  const onFocusCategory = () => {
    setPage(0);
    baseForm.setFieldsValue({
      product: "",
    });
  };

  const onFocusProperty = () => {
    setPage(0);
    baseForm.setFieldsValue({
      product: "",
    });
  };
  const hide = () => {
    setVisibleState({ visible: false });
  };
  const handleVisibleChange = (v) => {
    setVisibleState({ v });
  };
  // const listInnerRef = useRef();

  // const onScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight && productListTotalPages>currentPage) {
  //       setPage(page+1);
  //       // dispatch(getProductListByPropertyId(dataId, page, false));
  //       console.log("reached bottom");
  //     }
  //   }
  // };
  return (
    <div
    //   onScroll={onScroll }
    // ref={listInnerRef}
    // style={{ height: "800px", overflowY: "auto" }}
    >
      <Row style={{ marginTop: "20px" }}>
        <Col span={6} offset={8}>
          <Form
            form={baseForm}
            name="basic"
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            autoComplete="off"
            layout="inline"
            // onFinish={handleFinish}
          >
            <Row gutter={24}>
              <Col span={24}>Müştəri</Col>
              <Col className="gutter-row" span={24}>
                <Form.Item
                  // label="Müştəri"
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
              </Col>
              <Col span={16}>Tip</Col>
              <Col className="gutter-row" span={16}>
                <Form.Item
                  // label="Tip"
                  name="category"
                  rules={[{ required: false, message: "Tipi seçin!" }]}
                >
                  <Select
                    disabled={disable}
                    onChange={onChangeCategory}
                    onFocus={onFocusCategory}
                    showSearch
                    allowClear={true}
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
                    {listOfCategoryData.map((categoryData) => (
                      <Option key={categoryData.id} value={categoryData.id}>
                        {categoryData.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={8}>
                <Form.Item>
                  <Button
                    disabled={disable}
                    type="link"
                    onClick={onClickNewProducts}
                  >
                    Yeni
                  </Button>
                </Form.Item>
              </Col>
              <Col span={16}>Xüsusiyyət</Col>

              <Col className="gutter-row" span={16}>
                <Form.Item
                  // label="Xüsusiyyət"
                  name="property"
                  rules={[{ required: false, message: "Xüsusiyyəti seçin!" }]}
                >
                  <Select
                    disabled={disableForProAndCatCombo}
                    // style={{ width: "300px" }}
                    onChange={onChangeProperty}
                    onFocus={onFocusProperty}
                    showSearch
                    allowClear={true}
                    optionFilterProp="children"
                    // onSearch={onSearchproperty}
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
                    {propertyDataByCategoryId.map((propertyData) => (
                      <Option key={propertyData.id} value={propertyData.id}>
                        {propertyData.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={8}>
                <Form.Item>
                  <Button
                    disabled={disable}
                    type="link"
                    onClick={onClickAllProducts}
                  >
                    Bütün
                  </Button>
                </Form.Item>
              </Col>

              <Col span={16}>Məhsul</Col>
              <Col className="gutter-row" span={16}>
                <Form.Item
                  // label="Məhsul"
                  name="product"

                  // rules={[{ required: true, message: "Məhsulu seçin!" }]}
                >
                  <Input onChange={changeProductInput}></Input>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={7} offset={1}>
                <Form.Item>
                  <Button
                  style={{backgroundColor:"#0C9873",borderColor:"#0C9873"}}
                    disabled={disableForProAndCatCombo}
                    
                    type="primary"
                    onClick={onClickForPropertyAndCategoryCombo}
                  >
                    Axtar
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          {listOfProductDataById.map((item, index) => {
            return (
              <div>
                <Card
                  style={{ marginTop: "10px", overflowWrap: "break-word" }}
                  key="cardList"
                >
                  <Row>
                    <h4>
                      <b style={{ color: "red" }}>{item.isNew ? "Yeni" : ""}</b>
                    </h4>
                  </Row>
                  <Image
                    width="100%"
                    preview={true}
                    alt="logo"
                    // src={String(logo)}
                    src={
                      item.image === null
                        ? String(logo)
                        : `data:image/jpeg;base64,${item.image}`
                    }
                  />
                  <Row style={{ overflowWrap: "break-word" }}>
                    <h6 style={{ overflowWrap: "break-word" }}>
                      Məhsul: {item.name}
                    </h6>
                  </Row>
                  <Row>
                    <h6>Barkod: {item.barcode}</h6>
                  </Row>
                  <Row>
                    <h6>
                      Anbardakı sayı:{" "}
                      <b style={{ color: "red" }}>{item.quantity}</b>
                    </h6>
                  </Row>
                  <Row>
                    <h6>Qiymət: </h6>
                    <h4>
                      <b style={{ color: "red" }}>{item.sellPrice + " AZN"}</b>{" "}
                    </h4>
                  </Row>
                  <Row>
                    {" "}
                    <h6>
                      Qeyd:
                      <Popover
                        content={item.note}
                        // title="Title"
                        trigger="click"
                        visible={visibleState.visible}
                        onVisibleChange={handleVisibleChange}
                      >
                        <Button
                          disabled={item.note === null}
                          onClick={hide}
                          type="primary"
                        >
                          Bax
                        </Button>
                      </Popover>
                    </h6>
                  </Row>
                  <Form
                    form={topForm}
                    name="priceForm"
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 16 }}
                    autoComplete="off"
                    key={formKey}
                  >
                    <Form.Item label="Say">
                      <InputNumber
                        onChange={(e) => handleCountChange(e, item)}
                        defaultValue={0}
                        min={0}
                      ></InputNumber>
                    </Form.Item>

                    <Form.Item label="Digər qiymətlər">
                      <InputNumber
                        onChange={(e) => handleOtherPriceChange(e, item)}
                        defaultValue={0}
                        min={0}
                      ></InputNumber>
                    </Form.Item>

                    <Form.Item label="Müştəri satış qiyməti">
                      <InputNumber
                        onChange={(e) => handleCustomerSellPriceChange(e, item)}
                        defaultValue={0}
                        min={0}
                      ></InputNumber>
                    </Form.Item>
                  </Form>
                  <Form.Item wrapperCol={{ offset: 2 }}>
                    <Button
                      style={{ width: "100%",backgroundColor:"#0C9873",borderColor:"#0C9873" }}
                      type="primary"
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
          <br />
          <br />
          <Row>
            {productListTotalPages !== page + 1 &&
              listOfProductDataById?.length > 0 && (
                <Button
                  style={{ width: "100%" }}
                  onClick={() => setPage(page + 1)}
                >
                  {loading ? "Yüklənir..." : "Daha Çox"}
                </Button>
              )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
