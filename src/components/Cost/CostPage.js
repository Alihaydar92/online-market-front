import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, DatePicker, Modal, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CostAddModal from "./CostAddModal";
import { listOfCostType } from "../../redux/actions/costActions";
import CostTypeModal from "./CostTypeModal";
const { Option } = Select;
export default function CostPage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isAddCostModalVisible, setIsAddCostModalVisible] = useState(false);
  const [isCostTypeModalVisible, setIsCostTypeModalVisible] = useState(false);
  useEffect(() => {
    dispatch(listOfCostType());
  }, [dispatch]);

  const costTypesComboData = useSelector(
    (state) => state.costReducers?.costTypesListData
  );
  const onClickSearchCost = () => {};

  const onClickAddCost = () => {
    setIsAddCostModalVisible(true);
    setIsCostTypeModalVisible(false);
  };

  const handleCancel = () => {
    setIsAddCostModalVisible(false);
    setIsCostTypeModalVisible(false);
  };

  const onClickShowTypeModal = () => {
    setIsAddCostModalVisible(false);
    setIsCostTypeModalVisible(true);
  };
  return (
    <div>
      <Space>
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
          Növ əlavə et
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: "#0C9873",
            borderColor: "#0C9873",
            marginTop: "10px",
          }}
          onClick={onClickShowTypeModal}
        >
          Növ-Bax
        </Button>
      </Space>

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
            {costTypesComboData.map((costData) => (
              <Option value={costData.id} key={costData.id}>
                {costData.name}
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
            onClick={onClickSearchCost}
          >
            Axtar
          </Button>
        </Form.Item>
      </Form>
      <br />

      <Modal
        title="Xərc növünün əlavə edilməsi"
        visible={isAddCostModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <CostAddModal rowKey="addCostTypeModal" handleCancel={handleCancel} />
      </Modal>
      <Modal
        title="Xərc növü"
        visible={isCostTypeModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <CostTypeModal rowKey="costTypeModal" handleCancel={handleCancel} />
      </Modal>
    </div>
  );
}
