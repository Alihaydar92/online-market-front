import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "antd";
import {
  deleteExpeditor
} from "../../redux/actions/expeditorActions";
export default function ExpeditorDelete(props) {
  const dispatch = useDispatch();
  const expeditorDataById = useSelector(
    (state) => state.expeditorReducers.expeditorDataById
  );
  const listOfExpeditorData = useSelector(
    (state) => state.expeditorReducers?.expeditorListData
  );

  useEffect(() => {}, [expeditorDataById]);
  const onDelete = (id) => async (e) => {
    dispatch(deleteExpeditor(id), [listOfExpeditorData]);
    props.handleCancel();
  };

  return (
    <div>
      <Form>
        <Form.Item label="Əməkdaşın məlumatını silməyə əminsinizmi?"></Form.Item>
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
