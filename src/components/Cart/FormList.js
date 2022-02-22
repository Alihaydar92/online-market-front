import React from "react";
import { Form, Select, Space, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
export default function FormList() {
  const [form] = Form.useForm();
  const areas = [
    { label: "Beijing", value: "Beijing" },
    { label: "Shanghai", value: "Shanghai" },
  ];

  const sights = {
    Beijing: ["Tiananmen", "Great Wall"],
    Shanghai: ["Oriental Pearl", "The Bund"],
  };
  const listOfProductDataByCategoryId = useSelector(
    (state) => state.productReducers?.productListDataByCategoryId
  );
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  return (
    <div>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="area"
          label="Area"
          rules={[{ required: true, message: "Missing area" }]}
        >
          <Select options={areas} onChange={handleChange} />
        </Form.Item>
        <Form.List name="sights">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area ||
                      prevValues.sights !== curValues.sights
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Sight"
                        name={[field.name, "sight"]}
                        rules={[{ required: true, message: "Missing sight" }]}
                      >
                        <Select
                          disabled={!form.getFieldValue("area")}
                          style={{ width: 130 }}
                        >
                          {(sights[form.getFieldValue("area")] || []).map(
                            (item) => (
                              <Option key={item} value={item}>
                                {item}
                              </Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Price"
                    name={[field.name, "price"]}
                    rules={[{ required: true, message: "Missing price" }]}
                  >
                    <Input />
                  </Form.Item>

                  {/* <MinusCircleOutlined onClick={() => remove(field.name)} /> */}
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  // icon={<PlusOutlined />}
                >
                  Add sights
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
