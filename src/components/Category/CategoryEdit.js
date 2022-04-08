import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import {
  listOfCategories,
  updateCategory,
} from "../../redux/actions/categoryActions";
const { TextArea } = Input;
export default function CategoryEdit(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const categoryDataById = useSelector(
    (state) => state.categoryReducers?.categoryDataById
  );
  const onUpdate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name.trim(),
          note: form.getFieldsValue().note.trim(),
          id: categoryDataById?.id,
        };
        dispatch(updateCategory(data), []);
        props.handleCancel();
      })
      .catch((errorInfo) => {
        console.log("validate fields", errorInfo);
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      name: categoryDataById?.name,
      note: categoryDataById?.note === null ? "" : categoryDataById?.note,
    });
  }, [form, categoryDataById]);
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="Kateqoriya adı"
          name="name"
          rules={[
            { required: true, message: "Kateqoriyanın adını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input autoFocus="true" />
        </Form.Item>
        <Form.Item
          label="Qeyd"
          name="note"
          rules={[{ required: false, message: "Qeydi daxil edin!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ position: "absolute", left: "300px", bottom: "-90px" ,backgroundColor:"#0C9873",borderColor:"#0C9873"}}
            onClick={onUpdate}
          >
            Yadda saxla
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
