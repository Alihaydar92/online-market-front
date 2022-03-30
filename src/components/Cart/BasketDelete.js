import React from "react";
import { Button, Form } from "antd";
import { deleteCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
export default function BasketDelete(props) {
  const dispatch = useDispatch();
  const onDelete = (id) => async (e) => {
    dispatch(deleteCart(id));
    props.handleCancel();
  };
  return (
    <div>
      <Form>
        <Form.Item label="Səbət məlumatını silməyə əminsinizmi?"></Form.Item>
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" }}
            onClick={onDelete(props.basketIdProps)}
          >
            Bəli
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
