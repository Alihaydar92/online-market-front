import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, DatePicker, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import IncomeAddModal from "./IncomeAddModal";
import { listOfIncomeType } from "../../redux/actions/incomeActions";
const { Option } = Select;
export default function IncomePage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isAddIncomeModalVisible, setIsAddIncomeModalVisible] = useState(false);
  const onClickSearchIncome = () => {};

  const onClickAddIncome = () => {
    setIsAddIncomeModalVisible(true);
  };

  useEffect(() => {
    dispatch(listOfIncomeType());
  }, [dispatch]);
  const incomeTypesComboData = useSelector(
    (state) => state.incomeReducers?.incomeTypesListData
  );
  const handleCancel = () => {
    setIsAddIncomeModalVisible(false);
  };
  return (
    <div>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          backgroundColor: "#0C9873",
          borderColor: "#0C9873",
          marginTop: "10px",
        }}
        onClick={onClickAddIncome}
      >
        Əlavə et
      </Button>
      <Form layout={"inline"} form={form} style={{ marginTop: "20px" }}>
        <Form.Item
          label="Tarix aralığı"
          type="object"
          name="dateRange"
          rules={[{ required: false, message: "Tarix aralığını  daxil edin!" }]}
        >
          <DatePicker placeholder="tarix aralığını seçin" />
        </Form.Item>

        <Form.Item
          label="Sənədin nömrəsi"
          name="docNumber"
          rules={[{ required: false, message: "Növü daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Növü"
          name="type"
          rules={[{ required: true, message: "Məhsulu seçin!" }]}
        >
          <Select
           style={{width:"200px"}}
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
            {incomeTypesComboData.map((incomeData) => (
              <Option value={incomeData.id} key={incomeData.id}>
                {incomeData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Məbləğ"
          name="price"
          rules={[{ required: false, message: "Məbləği daxil edin!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            onClick={onClickSearchIncome}
          >
            Axtar
          </Button>
        </Form.Item>
      </Form>
      <br />

      <Modal
        title="Gəlir növünün əlavə edilməsi"
        visible={isAddIncomeModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <IncomeAddModal rowKey="id" handleCancel={handleCancel} />
      </Modal>
    </div>
  );
}
