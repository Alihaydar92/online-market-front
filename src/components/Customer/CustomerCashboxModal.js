import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, InputNumber, Select } from "antd";
import {
  cashboxAdd,
  getIncomeCostByTypeId,
} from "../../redux/actions/cashBoxActions";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;
export default function CustomerCashboxModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const incomeCostByTypeIdData = useSelector(
    (state) => state.cashboxReducers?.incomeCostByTypeId
  );
  useEffect(() => {
    dispatch(getIncomeCostByTypeId(1));
  }, [dispatch]);

  const onCreateCustomerCashbox = () => {
    form
      .validateFields()
      .then((values) => {
        var addData = {
          customerId: props.customerIdProps,
          amount: values.amount,
          explanation: values.explanation,
          profitExpenseId: values.type,
        };
        dispatch(cashboxAdd(addData,false));
        props.handleCancel();
        form.resetFields();
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="Məbləğ"
          name="amount"
          rules={[{ required: true, message: "Məbləği daxil edin!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Növü"
          name="type"
          rules={[{ required: true, message: "Növü daxil edin!" }]}
        >
          <Select
            style={{ width: "200px" }}
            // onChange={onChangeType}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => {
              return (
                option.props.children
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0 ||
                option.props.value
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              );
            }}
          >
            {incomeCostByTypeIdData.map((typeData) => (
              <Option value={typeData.id} key={typeData.id}>
                {typeData.name}
              </Option>
            ))}
          </Select>

          {/* {props.cashboxTypeDataStateProps.name} */}
        </Form.Item>

        <Form.Item
          label="Acıqlama"
          name="explanation"
          rules={[{ required: true, message: "Açıqlamanı daxil edin!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              position: "absolute",
              left: "300px",
              bottom: "-90px",
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            onClick={onCreateCustomerCashbox}
          >
            {"Əlavə et"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
