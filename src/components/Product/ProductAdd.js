import React, { useEffect } from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
import { listOfCategories } from "../../redux/actions/categoryActions";
import { listOfProperties } from "../../redux/actions/propertyActions";
import { addProduct,listOfProducts} from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
export default function ProductAdd(props) {
  const dispatch = useDispatch();

  const [form ] =Form.useForm();
   const listOfCategoryData = useSelector(
    (state) => state.categoryReducers.categoryListData
  );

  const listOfPropertyData = useSelector(
    (state) => state.propertyReducers.propertyListData
  );
  useEffect(() => {
    dispatch(listOfCategories());
  }, []);
  useEffect(() => {
    dispatch(listOfProperties());
  }, []);

  const onCreate =async (e) => {
    var data ={
        
        name:form.getFieldsValue().name,
        barcode:form.getFieldsValue().barcode,
        note:form.getFieldsValue().note,
        sellPrice:form.getFieldsValue().sellPrice,
        customerSellPrice:form.getFieldsValue().customerSellPrice,
        otherPrice:form.getFieldsValue().otherPrice,
        quantity:form.getFieldsValue().quantity,
        // categoryName:form.getFieldsValue().categoryData.name,
        // propertyName:form.getFieldsValue().propertyData.name
    };
    console.log('kateqoeri data: ',form.getFieldsValue().categoryName)
    //   form.validateFields().then((values)=>{
        
         

    //     //   dispatch(addProduct(data));
    //     //   props.handleCancel();
    //     //   dispatch(listOfProducts());
    //   }).catch(()=>{
    //       console.log('validate fields')
    //   })
  }
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Məhusulun adı"
          name="name"
          rules={[{ required: true, message: "Məhusulun adını daxil edin!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Barkod"
          name="barcode"
          rules={[{ required: true, message: "Barkodu daxil edin!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Qeyd"
          name="note"
          rules={[{ required: false, message: "Qeydi daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Satış qiyməti"
          name="sellPrice"
          rules={[{ required: false, message: "Satış qiymətini daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Müştəri satış qiyməti"
          name="customerSellPrice"
          rules={[
            { required: false, message: "Müştəri satış qiymətini daxil edin!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Digər qiymətlər"
          name="otherPrice"
          rules={[{ required: false, message: "Digər qiymətləri daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kəmiyyət"
          name="quantity"
          rules={[{ required: false, message: "Kəmiyyəti daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kateqoriya"
          name="categoryName"
          rules={[{ required: true, message: "Kateqoriyani seçin!" }]}
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
          name="propertyName"
          rules={[{ required: true, message: "Xüsusiyyəti seçin!" }]}
        >
          <Select>
            {listOfPropertyData.map((propertyData) => (
              <Option key={propertyData.id} value={propertyData.name}>
                {propertyData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item
          label="Satış strategiyası"
          name="priceStrategyList[].unitPrice"
          rules={[
            { required: false, message: "Satış strategiyasını daxil edin!" },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" }}
            onClick={onCreate}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
