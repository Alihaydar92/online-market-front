import React, { useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";
import { getProductListByCategoryId } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
function DynamicField(props) {
  console.log("categoryIdProps ", props.categoryIdProps);
  const dispatch = useDispatch();
  const form =Form.useForm();
  const listOfProductDataByCategoryId = useSelector(
    (state) => state.productReducers?.productListDataByCategoryId
  );
  useEffect(() => {
    dispatch(getProductListByCategoryId(props.categoryIdProps));
  }, []);
  useEffect(() => {
    // console.log(form.getFieldsValue())
  }, [form,listOfProductDataByCategoryId]);
  return (
    //   <Form 
    //   form={form}
    //   name="basic"
    //   labelCol={{ span: 8 }}
    //   wrapperCol={{ span: 16 }}
    //   autoComplete="off"
    //   >
 <Form.List  form={form} name="listOfProductDataByCategoryId" initialValues={{ listOfProductDataByCategoryId}}>
      {(listOfProductDataByCategoryId, { add, remove }) => {
        return (
          <div>
            {listOfProductDataByCategoryId.map((field, index) => (
              <div key={field.key}> {field.name}
                <Divider>Field {index + 1}</Divider>
                <Form.Item
                  name={[field.name, "name"]}
                  {...field}
                  label="name"
                  fieldKey={[field.fieldKey, 'name']}
                  rules={[{ required: true }]}
                >
                  <Input placeholder="field name" />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name={[field.quantity, "type"]}
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option value="string">String</Select.Option>
                    <Select.Option value="dropdown">Dropdown</Select.Option>
                    <Select.Option value="number">Number</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name={[index, "options"]} label="Options">
                  <Input placeholder="option 1, option 2, option 3" />
                </Form.Item>
                {listOfProductDataByCategoryId.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Above Field
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
              >
                <PlusOutlined /> Add field
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
    //   </Form>
   
  );
}

export default DynamicField;
