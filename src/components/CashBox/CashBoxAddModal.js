import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listOfCostType } from "../../redux/actions/costActions";
import { listOfIncomeType } from "../../redux/actions/incomeActions";
import { getCustomerListByExpeditorId } from "../../redux/actions/customerAction";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;
export default function CashBoxAddModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [typeComboData, setTypeComboData] = useState([]);
  const listOfCustomerByExpeditorId = useSelector(
    (state) => state.customerReducer?.customerDataListByExpeditorId
  );
  const costTypesComboData = useSelector(
    (state) => state.costReducers?.costTypesListData
  );
  const incomeTypesComboData = useSelector(
    (state) => state.incomeReducers?.incomeTypesListData
  );
  useEffect(() => {
    dispatch(listOfCostType());
  }, [dispatch]);
  useEffect(() => {
    dispatch(listOfIncomeType());
  }, [dispatch]);
  useEffect(() => {
    console.log(props.cashboxTypeDataStateProps);
    if (props.cashboxTypeDataStateProps === 1) {
      setTypeComboData(incomeTypesComboData);
    } else if (props.cashboxTypeDataStateProps === 2) {
      setTypeComboData(costTypesComboData);
    }
  }, [props.cashboxTypeDataStateProps]);
  const onCreateCost = () => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          customerId: values.customer,
          amount:values.amount,
          explanation:values.explanation,
          boxTypeId:values.type
        };
        console.log(data)
        //
        // props.handleCancel();
        // form.resetFields();
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
          label="Müştəri"
          name="customer"
          rules={[{ required: true, message: "Müştərini seçin!" }]}
        >
          <Select
            autoFocus="true"
            // onChange={onChangeCustomer}
            // style={{ width: "300px" }}
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
            {listOfCustomerByExpeditorId.map((customerData) => (
              <Option key={customerData.id} value={customerData.id}>
                {customerData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
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
            {typeComboData.map((costData) => (
              <Option value={costData.id} key={costData.id}>
                {costData.name}
              </Option>
            ))}
          </Select>
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
              left: "320px",
              bottom: "-90px",
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            onClick={onCreateCost}
          >
            Əlavə et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
