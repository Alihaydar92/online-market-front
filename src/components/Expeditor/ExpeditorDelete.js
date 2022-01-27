import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "antd";
import { deleteExpeditor , listOfExpeditors} from '../../redux/actions/expeditorActions';
export default function ExpeditorDelete(props) {
  const dispatch = useDispatch();
  const expeditorDataById = useSelector(
    (state) => state.expeditorReducers.expeditorDataById
  );
  const [form] = Form.useForm();
  const listOfExpeditorData = useSelector(
    (state) => state.expeditorReducers?.expeditorListData
  );

  useEffect(() => {}, [expeditorDataById]);
  const onDelete = (id) => async (e) => {
    dispatch(deleteExpeditor(id),[listOfExpeditorData]);
    props.handleCancel();
    dispatch(listOfExpeditors());
  };

 
  return (
    <div>
      <Form
        // form={form}
        // name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // initialValues={{
        //     remember: true,
        //   name: customerDataById.name,
        //   surname: customerDataById?.surname,
        //   note: customerDataById?.note,
        // }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
        // autoComplete="off"
      >
         <Form.Item
         
          label="Əməkdaşın məlumatını silməyə əminsinizmi?"
        >
      
        </Form.Item>
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" }}
            onClick={onDelete(expeditorDataById.id)}
          >
            Bəli
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
