import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listOfCostType } from "../../redux/actions/costActions";
import { listOfIncomeType } from "../../redux/actions/incomeActions";
const { Option } = Select;
export default function CashBoxEdit(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [typeComboData, setTypeComboData] = useState([]);
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
    if (props.cashboxTypeDataStateProps === 1) {
      setTypeComboData(incomeTypesComboData);
    } else if (props.cashboxTypeDataStateProps === 2) {
      setTypeComboData(costTypesComboData);
    }
  }, [props.cashboxTypeDataStateProps]);
  useEffect(() => {
    form.setFieldsValue({
      name: cashboxByIdData?.name === null ? "" : cashboxByIdData?.name,
      type:
        cashboxByIdData?.boxTypeId === null ? "" : cashboxByIdData?.boxTypeId,
      // note: cashboxByIdData?.note === null ? "" : customerDataById?.note,
    });
  }, [form, cashboxByIdData]);
  const onUpdateCost = () => {};
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
        {/* <Form.Item
          label="Acıqlama"
          name="explanation"
          rules={[{ required: true, message: "Açıqlamanı daxil edin!" }]}
        >
          <TextArea />
        </Form.Item> */}
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
            onClick={onUpdateCost}
          >
            Yadda saxla
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
