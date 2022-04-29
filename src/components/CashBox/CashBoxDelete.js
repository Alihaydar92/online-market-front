import React from "react";
import { Form, Button } from "antd";
import { cashboxDelete } from "../../redux/actions/cashBoxActions";
import { useDispatch } from "react-redux";
export default function CashBoxDelete(props) {
  const dispatch = useDispatch();
  const onDelete = (id) => async (e) => {
    dispatch(cashboxDelete(id));
    props.handleCancel();
  };
  return (
    <div>
      <Form>
        <Form.Item label="Kassa məlumatını silməyə əminsinizmi?"></Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              position: "absolute",
              left: "320px",
              bottom: "-90px",
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            onClick={onDelete(props?.cashboxIdProps)}
          >
            Bəli
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
