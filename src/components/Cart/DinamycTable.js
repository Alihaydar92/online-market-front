import React, { useState, useEffect } from "react";
import { Form, Button, InputNumber, Select, Row, Col, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { listOfProducts } from "../../redux/actions/productActions";
import { listOfCustomers } from "../../redux/actions/customerAction";
import { listOfExpeditors } from "../../redux/actions/expeditorActions";
const { Option } = Select;
function App() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [inputList, setInputList] = useState([
    { id: "", quantity: "" },
  ]);
  useEffect(() => {
    dispatch(listOfProducts());
  }, []);
  useEffect(() => {
    dispatch(listOfExpeditors());
  }, []);

  useEffect(() => {
    dispatch(listOfCustomers());
  }, []);
  const productList = useSelector(
    (state) => state.productReducers.productListData
  );
  const customerList = useSelector(
    (state) => state.customerReducer.customerListData
  );
  const expeditorList = useSelector(
    (state) => state.expeditorReducers.expeditorListData
  );
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    form
    .validateFields()
    .then((values) => {
      var data = {
        product: form.getFieldsValue().product,
        quantity: form.getFieldsValue().quantity
      };
console.log('rpoduct data add: ',data)
    })
    .catch(() => {
      console.log("validate fields");
    });

    setInputList([
      ...inputList,
      {id:"", quantity: "" },
    ]);
  };

  return (
    <div className="App">
      <Row>
        <Col span={12}>
          <Form.Item
            label="Müştəri"
            name="category"
            rules={[{ required: true, message: "Müştərini seçin!" }]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              // onSearch={onSearchCustomer}
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
        <Col span={12}>
          <Form.Item
            label="Ekspeditor"
            name="expeditor"
            rules={[{ required: true, message: "Ekspeditoru seçin!" }]}
          >
            <Select
              showSearch
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
              }}
            >
              {expeditorList.map((expeditorData) => (
                <Option key={expeditorData.id} value={expeditorData.id}>
                  {expeditorData.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      {inputList.map((x, i) => {
          
        return (
          <Form 
          form={form}
          >
           
            <Row>
              <Col span={12}>
                <Form.Item
                  label="Məhsul"
                  name="product"
                  rules={[{ required: true, message: "Məhsulu seçin!" }]}
                >
                
                <Select
                  name="product"
                  showSearch
                //   value={x.product.id}
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
                  }}
                >
                  {productList.map((productData) => (
                    <Option key={productData.id} value={productData.id}>
                      {productData.name}
                    </Option>
                  ))}
                </Select>
                </Form.Item>
              
              </Col>
              <Col>
                <Form.Item
                  label="Kəmiyyət"
                //   name="quantity"
                  rules={[{ required: true, message: "Kəmiyyəti daxil edin!" }]}
                >
                  <Input
                    name="quantity"
                    value={x.quantity}
                    onChange={(e)  => handleInputChange(e, i)}
                  />
                </Form.Item>
                {/* <input
              className="ml10"
              name="lastName"
              placeholder="Enter Last Name"
              value={x.lastName}
              onChange={e => handleInputChange(e, i)}
            /> */}
              </Col>

              <Col>
                <div className="btn-box">
                  {inputList.length !== 1 && (
                    <button
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </button>
                  )}
                  {inputList.length - 1 === i && (
                    <button onClick={handleAddClick}>Add</button>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

export default App;
