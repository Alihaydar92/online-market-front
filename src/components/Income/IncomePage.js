import React, { useState } from "react";
import { Form, Select, Input, Button, DatePicker, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import IncomeAddModal from "./IncomeAddModal";
export default function IncomePage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isAddIncomeModalVisible, setIsAddIncomeModalVisible] = useState(false);
  const onClickSearchIncome = () => {};

  const onClickAddIncome = () => {
    setIsAddIncomeModalVisible(true);
  };

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
          label="Növü"
          name="type"
          rules={[{ required: false, message: "Növü daxil edin!" }]}
        >
          <Input />
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
        title="Gəlir məlumatının əlavə edilməsi"
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
