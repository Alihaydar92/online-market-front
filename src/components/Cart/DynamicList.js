import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Input, Divider, Select } from "antd";
import DynamicField from "./DynamicField";
import { listOfCategories } from "../../redux/actions/categoryActions";
import "./styles.css";
import "antd/dist/antd.css";
const { Option } = Select;
const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
  },
};

export default function DynamicList() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    dispatch(listOfCategories());
  }, []);

  //   useEffect(() => {
  //     dispatch(getCustomerListByExpeditorId());
  //   }, []);

  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers?.categoryListData
  );

  function handleFinish(values) {
    console.log("VALUES", values);
    alert("Check console for values");
  }
  const onChangeCategory = (value) => {
    setCategoryId(value);
    console.log(categoryId)
  };
  return (
    <div className="App">
      <h1>AntD Dynamic Form Example</h1>
      <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
        <Form.Item
          name="first"
          label="Persistent Field"
          rules={[{ required: true }]}
        >
          <Select
            style={{ width: "300px" }}
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
        <Divider dashed>Additional Fields</Divider>
        <DynamicField categoryIdProps={categoryId} />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
