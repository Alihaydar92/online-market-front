import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  cashboxAdd,
  getIncomeCostByTypeId,
  cashboxUpdate,
} from "../../redux/actions/cashBoxActions";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;
export default function CashBoxAddEditModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const [typeId, setTypeId] = useState();

  const listOfCustomerByExpeditorId = useSelector(
    (state) => state.customerReducer?.customerDataListByExpeditorId
  );
  const incomeCostByTypeIdData = useSelector(
    (state) => state.cashboxReducers?.incomeCostByTypeId
  );
  const cashboxByIdData = useSelector(
    (state) => state.cashboxReducers?.cashboxByIdData
  );
  useEffect(() => {
    dispatch(getIncomeCostByTypeId(props.cashboxTypeDataStateProps.id));
  }, [dispatch]);
  useEffect(() => {
    console.log(incomeCostByTypeIdData);
  }, [incomeCostByTypeIdData]);
  useEffect(() => {
    if (props.isEditProps) {
      // setTypeId(cashboxByIdData?.boxTypeId);
      form.setFieldsValue({
        amount: cashboxByIdData?.amount === null ? "" : cashboxByIdData?.amount,
        type:
          cashboxByIdData?.profitExpenseDto === null
            ? null
            : cashboxByIdData?.profitExpenseDto.id,
        explanation:
          cashboxByIdData?.explanation === null
            ? ""
            : cashboxByIdData?.explanation,
        customer:
          cashboxByIdData?.customerDto === null
            ? null
            : cashboxByIdData?.customerDto.id,
        typeName:
          cashboxByIdData?.profitExpenseDto === null
            ? null
            : cashboxByIdData?.profitExpenseDto.name,
      });
    }
  }, [form, cashboxByIdData]);
  const onCreateUpdateCost = () => {
    console.log(form.getFieldsValue().type);
    form
      .validateFields()
      .then((values) => {
        console.log(values.type);

        //
        if (props.isEditProps) {
          var updateData = {
            customerId: values.customer,
            amount: values.amount,
            explanation: values.explanation,
            profitExpenseId:
              cashboxByIdData?.profitExpenseDto === null
                ? null
                : cashboxByIdData?.profitExpenseDto.id,
          };
          console.log(updateData);
          console.log(props.cashboxTypeDataStateProps.id);
          console.log(cashboxByIdData?.profitExpenseDto.id);
          console.log(cashboxByIdData?.id);
          dispatch(cashboxUpdate(cashboxByIdData?.id, updateData));
        } else {
          var addData = {
            customerId: values.customer,
            amount: values.amount,
            explanation: values.explanation,
            profitExpenseId: values.type,
          };
          console.log(addData);
          dispatch(cashboxAdd(addData));
        }
        props.handleCancel();
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const onChangeType = (e) => {
  //   console.log(e);
  //   setTypeId(e);
  // };
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

        {props.isEditProps ? (
          <Form.Item
            label="Növü"
            name="typeName"
            rules={[{ required: true, message: "Növü daxil edin!" }]}
          >
            <Input disabled={true} />
          </Form.Item>
        ) : (
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
        )}
        <Form.Item
          label="Acıqlama"
          name="explanation"
          rules={[
            { required: props.isEditProps, message: "Açıqlamanı daxil edin!" },
          ]}
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
