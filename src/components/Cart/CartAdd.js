import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, InputNumber, Select, Row, Col } from "antd";
import { listOfCustomers } from "../../redux/actions/customerAction";
import { listOfExpeditors } from "../../redux/actions/expeditorActions";
const { Option } = Select;
export default function CartAdd() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOfExpeditors());
  }, []);

  useEffect(() => {
    dispatch(listOfCustomers());
  }, []);

  const customerList = useSelector(
    (state) => state.customerReducer.customerListData
  );
  const expeditorList = useSelector(
    (state) => state.expeditorReducers.expeditorListData
  );
  
  const productList = useSelector(
    (state) => state.productReducers.productListData
  );

  const onSearchCustomer = (value) => {
    console.log("customer value ", value);
  };
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
        <Row>
          <Col span={6}>
            <Form.Item
              label="Müştəri"
              name="category"
              rules={[{ required: true, message: "Müştərini seçin!" }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                onSearch={onSearchCustomer}
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
                {customerList.map((customerData) => (
                  <Option key={customerData.id} value={customerData.id}>
                    {customerData.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Ekspeditor"
              name="expeditor"
              rules={[{ required: true, message: "Ekspeditoru seçin!" }]}
            >
              <Select showSearch
                optionFilterProp="children"
                // onSearch={onSearchExpeditor}
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
                }}>
                {expeditorList.map((expeditorData) => (
                  <Option key={expeditorData.id} value={expeditorData.id}>
                    {expeditorData.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="Məhsul"
              name="product"
              rules={[{ required: true, message: "Məhsulu seçin!" }]}
            >
              <Select showSearch
                optionFilterProp="children"
                // onSearch={onSearchProduct}
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
                }}>
                {productList.map((productData) => (
                  <Option key={productData.id} value={productData.id}>
                    {productData.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Kəmiyyət"
              name="quantity"
              rules={[{ required: true, message: "Kəmiyyəti daxil edin!" }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Form.Item>
              <Button
                type="submit"
                htmlType="submit"
                style={{ position: "absolute", left: "320px", bottom: "-90px" }}
                // onClick={onCreate}
              >
                Səbətə at
              </Button>
            </Form.Item>
          </Col>
        </Row>

      </Form>
    </div>
  );
}
