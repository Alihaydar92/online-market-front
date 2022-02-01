import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "antd";
import {
  deleteCustomer
} from "../../redux/actions/customerAction";
export default function CustomerDelete(props) {
  const dispatch = useDispatch();
  const customerDataById = useSelector(
    (state) => state.customerReducer.customerDataById
  );
  const listOfCustomerData = useSelector(
    (state) => state.customerReducer?.customerListData
  );
  const onDelete = (id) => async (e) => {
    dispatch(deleteCustomer(id), [listOfCustomerData]);
    props.handleCancel();
  };

  return (
    <div>
      <Form>
        <Form.Item label="Müştərinin məlumatını silməyə əminsinizmi?"></Form.Item>
        <Form.Item>
          <Button
            type="submit"
            htmlType="submit"
            style={{ position: "absolute", left: "320px", bottom: "-90px" }}
            onClick={onDelete(customerDataById.id)}
          >
            Bəli
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
