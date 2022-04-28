import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, DatePicker, Space, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  cashboxTypeList,
  cashboxAdd,
} from "../../redux/actions/cashBoxActions";
import { getExpeditorByUsername } from "../../redux/actions/expeditorActions";
import CashBoxAddModal from "./CashBoxAddModal";

const { Option } = Select;
export default function CashBoxPage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [cashboxTypeDataState, setCashboxTypeDataState] = useState(null);
  const [isAddCashboxModalVisible, setIsAddCashboxModalVisible] =
    useState(false);
  const cashboxTypeListData = useSelector(
    (state) => state.cashboxReducers?.cashboxTypeListData
  );
  useEffect(() => {
    dispatch(getExpeditorByUsername(window.localStorage.getItem("username")));
  }, [dispatch]);
  useEffect(() => {
    dispatch(cashboxTypeList());
  }, []);

  const onChangeCashboxCombo = (e) => {
    setCashboxTypeDataState(e);
  };

  const onClickAddCashbox = () => {
    setIsAddCashboxModalVisible(true);
    // form
    //   .validateFields()
    //   .then((values) => {
    //     var addData = {
    //       name: values.customer,
    //       boxTypeId: cashboxTypeDataState,
    //     };
    //     console.log(addData);
    //     dispatch(cashboxAdd(addData));
    //   })
    //   .catch((err) => {}),
  };
  const handleCancel = () => {
    setIsAddCashboxModalVisible(false);
  };
  return (
    <div>
      <Space style={{ marginTop: "20px" }}>
        Kassa tipi:
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
          {cashboxTypeListData.map((cashboxTypeData, index) => (
            <Option key={cashboxTypeData.id} value={cashboxTypeData.id}>
              {cashboxTypeData.name}
            </Option>
          ))}
        </Select>
        <Button
          disabled={cashboxTypeDataState === null ? true : false}
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: "#0C9873",
            borderColor: "#0C9873",
          }}
          onClick={onClickAddCashbox}
        >
          Əlavə et
        </Button>
      </Space>
      {/* <br /> */}
      {cashboxTypeDataState === null ? (
        <p>Məlumat yoxdur</p>
      ) : (
        <Form layout={"inline"} form={form} style={{ marginTop: "20px" }}>
          <Form.Item
            label="Tarix aralığı"
            type="object"
            name="dateRange"
            rules={[
              { required: false, message: "Tarix aralığını  daxil edin!" },
            ]}
          >
            <DatePicker placeholder="tarix aralığını seçin" />
          </Form.Item>
          <Form.Item
            label="Müştəri"
            name="customer"
            rules={[{ required: true, message: "Müştərini daxil edin!" }]}
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
          <Form.Item
            label="Növü"
            name="type"
            rules={[{ required: false, message: "Növü daxil edin!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Qeyd"
            name="note"
            rules={[{ required: false, message: "Qeydi daxil edin!" }]}
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
              // onClick={onClickSearchCashbox}
            >
              Axtar
            </Button>
          </Form.Item>
        </Form>
      )}
      <br />

      <Modal
        title="Kassa əlavə edilməsi"
        visible={isAddCashboxModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <CashBoxAddModal
          cashboxTypeDataStateProps={cashboxTypeDataState}
          rowKey="id"
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
