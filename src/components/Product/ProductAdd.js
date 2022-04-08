import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Select } from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { listOfProperties } from "../../redux/actions/propertyActions";
import { addProduct } from "../../redux/actions/productActions";

const { Option } = Select;
const { TextArea } = Input;
export default function ProductAdd(props) {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const listOfCategoryData = useSelector(
    (state) => state.categoryReducers?.categoryListData
  );

  const listOfPropertyData = useSelector(
    (state) => state.propertyReducers?.propertyListData
  );
  useEffect(() => {
    dispatch(listOfCategories());
  }, []);
  useEffect(() => {
    dispatch(listOfProperties());
  }, []);

  const onCreate =  (e) => {
    console.log("property data: ", form.getFieldsValue().property);
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name.trim(),
          barcode: form.getFieldsValue().barcode.trim(),
          categoryId: form.getFieldsValue().category,
          propertyId: form.getFieldsValue().property,
          note: form.getFieldsValue().note.trim(),
        };
        console.log("rpoduct data add: ", data);
        dispatch(addProduct(data,1,15));
        props.handleCancel();
        props.firstPage();
        form.resetFields();
      })
      .catch((err) => {
        console.log("validate fields",err);
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      name: "",
      barcode: "",
      categoryId: null,
      propertyId: null,
      note: "",
    });
  }, [form]);
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Məhusulun adı"
          name="name"
          rules={[
            { required: true, message: "Məhusulun adını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input autoFocus={true}/>
        </Form.Item>

        <Form.Item
          label="Barkod"
          name="barcode"
          rules={[
            { required: true, message: "Barkodu daxil edin!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Qeyd"
          name="note"
          rules={[{ required: false, message: "Qeydi daxil edin!" }]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item
          label="Tip"
          name="category"
          rules={[{ required: true, message: "Tipi seçin!" }]}
        >
          <Select>
            {listOfCategoryData.map((categoryData) => (
              <Option key={categoryData.id} value={categoryData.id}>
                {categoryData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Xüsusiyyət"
          name="property"
          rules={[{ required: true, message: "Xüsusiyyəti seçin!" }]}
        >
          <Select>
            {listOfPropertyData.map((propertyData) => (
              <Option key={propertyData.id} value={propertyData.id}>
                {propertyData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" ,backgroundColor:"#0C9873",borderColor:"#0C9873"}}
            onClick={onCreate}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
