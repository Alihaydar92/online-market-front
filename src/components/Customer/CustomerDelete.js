import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "antd";
import {
  deleteCustomer,
  listOfCustomers,
} from "../../redux/actions/customerAction";
export default function CustomerDelete(props) {
  const dispatch = useDispatch();
  const customerDataById = useSelector(
    (state) => state.customerReducer.customerDataById
  );
  const [form] = Form.useForm();
  const listOfCustomerData = useSelector(
    (state) => state.customerReducer?.customerListData
  );
  // const modalSituation=useSelector((state)=>state.modalsStore?.showYesNoModal)
  useEffect(() => {}, [customerDataById]);
  const onDelete = (id) => async (e) => {
    dispatch(deleteCustomer(id), [listOfCustomerData]);
    props.handleCancel();
    dispatch(listOfCustomers());
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
