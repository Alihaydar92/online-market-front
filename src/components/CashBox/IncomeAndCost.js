import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button, Input, Select } from "antd";
import {
  cashboxTypeList,
  incomeCostList,
  incomeCostAdd,
} from "../../redux/actions/cashBoxActions";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
export default function IncomeAndCost() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isElaveEtModalVisible, setIsElaveEtModalVisible] = useState();
  const cashboxTypeListData = useSelector(
    (state) => state.cashboxReducers?.cashboxTypeListData
  );
  const incomeCostListData = useSelector(
    (state) => state.cashboxReducers?.incomeCostListData
  );
  useEffect(() => {
    dispatch(cashboxTypeList());
  }, [dispatch]);
  useEffect(() => {
    dispatch(incomeCostList());
  }, [dispatch]);
  const onClickAdd = () => {
    setIsElaveEtModalVisible(true);
  };
  const handleCancel = () => {
    setIsElaveEtModalVisible(false);
  };

  const incomeCostColumns = [
    {
      title: "Gəlir vəya xərcin adı",
      dataIndex: "name",
    },
    {
      title: "Kassa tipi",
      dataIndex: ["cashboxTypeDto", "name"],
    },
  ];

  const onChangeCashboxCombo = () => {};

  const onCreate = () => {
    form
      .validateFields()
      .then((values) => {
        var data = {
          name: values.name,
          typeId: values.type,
        };
        console.log(data);
        dispatch(incomeCostAdd(data));
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          backgroundColor: "#0C9873",
          borderColor: "#0C9873",
          marginTop: "20px",
        }}
        onClick={onClickAdd}
      >
        Əlavə et
      </Button>
      <Table
        scroll={{ y: 530 }}
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={incomeCostListData}
        columns={incomeCostColumns}
        rowKey="id"
      ></Table>
      <Modal
        title="Xüsusiyyət məlumatının əlavə edilməsi"
        visible={isElaveEtModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Gəlir vəya xərcin adı"
            name="name"
            rules={[
              {
                required: true,
                message: "Gəlir vəya xərcin adını daxil edin!",
              },
            ]}
          >
            <Input autoFocus="true" />
          </Form.Item>
          <Form.Item
            label="Kassa tipi"
            name="type"
            rules={[{ required: true, message: "Kassa tipini daxil edin!" }]}
          >
            <Select
              style={{ width: 200 }}
              onChange={onChangeCashboxCombo}
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
              {cashboxTypeListData.map((cashboxTypeData) => (
                <Option key={cashboxTypeData.id} value={cashboxTypeData.id}>
                  {cashboxTypeData.name}
                </Option>
              ))}
            </Select>
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
              onClick={onCreate}
            >
              Əlavə et
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
