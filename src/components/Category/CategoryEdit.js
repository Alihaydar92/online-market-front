import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import {listOfCategories,updateCategory} from "../../redux/actions/categoryActions"
const {TextArea} =Input;
export default function CategoryEdit(props) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const categoryDataById = useSelector(
        (state) => state.categoryReducers.categoryDataById
      );

      const onUpdate = async (e) => {
        form
          .validateFields()
          .then((values) => {
            var data = {
              name: form.getFieldsValue().name,
              surname: form.getFieldsValue().surname,
              note: form.getFieldsValue().note,
              id: categoryDataById.id
            };
            dispatch(updateCategory(data),[]);
            props.handleCancel();
            dispatch(listOfCategories());
          })
          .catch((errorInfo) => {
            console.log("validate fields");
          });
      };
      useEffect(() => {
        form.setFieldsValue({
            name: categoryDataById.name,
            // note:categoryDataById.note
        })
      },[form,categoryDataById]);
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
          rules={[{ required: true, message: "Kateqoriyanın adını daxil edin!" },{min:2, message:"Minimum 2 simvol daxil edin"}]}
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
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "300px", bottom: "-90px" }}
            onClick={onUpdate}
          >
            Yadda saxla
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
