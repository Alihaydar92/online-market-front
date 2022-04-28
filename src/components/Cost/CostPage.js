import React,{useState} from "react";
import { Form, Select, Input, Button, DatePicker,Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CostAddModal from "./CostAddModal";
export default function CostPage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isAddCostModalVisible,setIsAddCostModalVisible]=useState(false);
  const onClickSearchCost = () => {};

  const onClickAddCost = () => {
      setIsAddCostModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddCostModalVisible(false);
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
        onClick={onClickAddCost}
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
            onClick={onClickSearchCost}
          >
            Axtar
          </Button>
        </Form.Item>
      </Form>
      <br/>

      <Modal
        title="Xərc məlumatının əlavə edilməsi"
        visible={isAddCostModalVisible}
        destroyOnClose={true} 
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <CostAddModal rowKey="id" handleCancel={handleCancel}/>
      </Modal>
    </div>
  );
}
