import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { updateExpeditor } from "../../redux/actions/expeditorActions";
const { TextArea } = Input;
export default function ExpeditorEdit(props) {
  const dispatch = useDispatch();
  const expeditorDataById = useSelector(
    (state) => state.expeditorReducers?.expeditorDataById
  );
  const [form] = Form.useForm();
  const listOfExpeditorData = useSelector(
    (state) => state.expeditorReducers?.expeditorListData
  );
  const onUpdate = async (e) => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: form.getFieldsValue().name.trim(),
          surname: form.getFieldsValue().surname.trim(),
          note: form.getFieldsValue().note.trim(),
          id: expeditorDataById?.id,
        };
        dispatch(updateExpeditor(data), [listOfExpeditorData]);
        props.handleCancel();
      })
      .catch((errorInfo) => {
        console.log("validate fields");
      });
  };
  useEffect(() => {
    form.setFieldsValue({
      name: expeditorDataById?.name === null ? "" : expeditorDataById?.name,
      surname:
        expeditorDataById?.surname === null ? "" : expeditorDataById?.surname,
      note: expeditorDataById?.note === null ? "" : expeditorDataById?.note,
    });
  }, [form, expeditorDataById]);

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
          label="Əməkdaş adı"
          name="name"
          rules={[
            { required: true, message: "Əməkdaş adını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
          ]}
        >
          <Input autoFocus="true"/>
        </Form.Item>

        <Form.Item
          label="Əməkdaş soyadı"
          name="surname"
          rules={[
            { required: true, message: "Satıcı soyadını daxil edin!" },
            { min: 2, message: "Minimum 2 simvol daxil edin" },
            { max: 200, message: "Maksimum 200 simvol daxil edin" },
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ position: "absolute", left: "300px", bottom: "-90px",backgroundColor:"#0C9873",borderColor:"#0C9873"  }}
            onClick={onUpdate}
          >
            Yadda saxla
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
