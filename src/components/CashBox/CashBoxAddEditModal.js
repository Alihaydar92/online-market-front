import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listOfCostType } from "../../redux/actions/costActions";
import { listOfIncomeType } from "../../redux/actions/incomeActions";
import { getCustomerListByExpeditorId } from "../../redux/actions/customerAction";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;
export default function CashBoxAddEditModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [typeComboData, setTypeComboData] = useState([]);
  const [typeId, setTypeId] = useState();

  const listOfCustomerByExpeditorId = useSelector(
    (state) => state.customerReducer?.customerDataListByExpeditorId
  );
  const costTypesComboData = useSelector(
    (state) => state.costReducers?.costTypesListData
  );
  const incomeTypesComboData = useSelector(
    (state) => state.incomeReducers?.incomeTypesListData
  );
  const cashboxByIdData = useSelector(
    (state) => state.cashboxReducers?.cashboxByIdData
  );
  useEffect(() => {
    dispatch(listOfCostType());
  }, [dispatch]);
  useEffect(() => {
    dispatch(listOfIncomeType());
  }, [dispatch]);
  useEffect(() => {
    console.log(props.cashboxTypeDataStateProps);
    if (props.cashboxTypeDataStateProps.id === 1) {
      setTypeComboData(incomeTypesComboData);
    } else if (props.cashboxTypeDataStateProps.id === 2) {
      setTypeComboData(costTypesComboData);
    }
  }, [props.cashboxTypeDataStateProps]);
  useEffect(() => {
    if (props.isEditProps) {
      setTypeId(cashboxByIdData?.boxTypeId);
      form.setFieldsValue({
        amount: cashboxByIdData?.amount === null ? "" : cashboxByIdData?.amount,
        type:
          cashboxByIdData?.boxTypeId === null
            ? null
            : cashboxByIdData?.boxTypeId,
        explanation:
          cashboxByIdData?.explanation === null
            ? ""
            : cashboxByIdData?.explanation,
        customer:
          cashboxByIdData?.customerDto === null
            ? null
            : cashboxByIdData?.customerDto.id,
      });
    }
  }, [form, cashboxByIdData]);
  const onCreateUpdateCost = () => {
    console.log(form.getFieldsValue().type);
    form
      .validateFields()
      .then((values) => {
        console.log(values.type);
        var data = {
          customerId: values.customer,
          amount: values.amount,
          explanation: values.explanation,
          boxTypeId: typeId,
        };
        console.log(data);
        //
        props.handleCancel();
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeType = (e) => {
    console.log(e);
    setTypeId(e);
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
          rules={[{ required: false, message: "Növü daxil edin!" }]}
        >
          <Select
            style={{ width: "200px" }}
            onChange={onChangeType}
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
            {typeComboData.map((typeData) => (
              <Option value={typeData.id} key={typeData.id}>
                {typeData.name}
              </Option>
            ))}
          </Select>
          {props.cashboxTypeDataStateProps.name}
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
            onClick={onCreateUpdateCost}
          >
            {props.isEditProps ? "Yadda saxla" : "Əlavə et"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
