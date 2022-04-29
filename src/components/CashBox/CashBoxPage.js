import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  Space,
  Modal,
  Table,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  cashboxTypeList,
  cashboxAdd,
  cashboxList,
  cashboxById,
} from "../../redux/actions/cashBoxActions";
import { getExpeditorByUsername } from "../../redux/actions/expeditorActions";
import CashBoxAddModal from "./CashBoxAddModal";
import CashBoxDelete from "./CashBoxDelete";
import CashBoxEdit from "./CashBoxEdit";

const { Option } = Select;
export default function CashBoxPage() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [cashboxTypeDataState, setCashboxTypeDataState] = useState(null);
  const [isAddCashboxModalVisible, setIsAddCashboxModalVisible] =
    useState(false);
  const [isEditCashboxModalVisible, setIsEditCashboxModalVisible] =
    useState(false);
  const [isDeleteCashboxModalVisible, setIsDeleteCashboxModalVisible] =
    useState(false);

  const [cashboxId, setCashboxId] = useState();
  const cashboxTypeListData = useSelector(
    (state) => state.cashboxReducers?.cashboxTypeListData
  );
  const cashboxListData = useSelector(
    (state) => state.cashboxReducers?.cashboxListData
  );
  useEffect(() => {
    dispatch(getExpeditorByUsername(window.localStorage.getItem("username")));
  }, [dispatch]);
  useEffect(() => {
    dispatch(cashboxTypeList());
  }, []);
  useEffect(() => {
    dispatch(cashboxList());
  }, []);
  const columns = [
    {
      title: "Kassa tipi",
      dataIndex: ["cashboxTypeDto", "name"],
    },
    {
      title: "Müştəri",
      dataIndex: ["customerDto", "name"],
    },
    {
      title: "Məbləğ",
      dataIndex: "amount",
    },
    {
      title: "Açıqlama",
      dataIndex: "explanation",
    },

    {
      title: "Əməliyyat",
      dataIndex: "operation",
      render: (text, cashboxData) => {
        return (
          <Space size="middle">
            <Button
              disabled={cashboxTypeDataState === null ? true : false}
              style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
              size="small"
              type="primary"
              onClick={() => showEditModal(cashboxData)}
            >
              Redaktə et
            </Button>
            <Button
              size="small"
              type="danger"
              onClick={() => showRemoveModal(cashboxData.id)}
            >
              Sil
            </Button>
          </Space>
        );
      },
    },
  ];
  const onChangeCashboxCombo = (e) => {
    setCashboxTypeDataState(e);
  };

  const onClickAddCashbox = () => {
    setIsAddCashboxModalVisible(true);
    setIsEditCashboxModalVisible(false);
    setIsDeleteCashboxModalVisible(false);
  };
  const handleCancel = () => {
    setIsAddCashboxModalVisible(false);
    setIsEditCashboxModalVisible(false);
    setIsDeleteCashboxModalVisible(false);
  };

  const showRemoveModal = (id) => {
    setCashboxId(id);
    setIsEditCashboxModalVisible(false);
    setIsAddCashboxModalVisible(false);
    setIsDeleteCashboxModalVisible(true);
  };

  const showEditModal = (data) => {
    dispatch(cashboxById(data.id));
    setIsAddCashboxModalVisible(false);
    setIsEditCashboxModalVisible(true);
    setIsDeleteCashboxModalVisible(false);
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
      <Table
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        scroll={{ y: 530 }}
        dataSource={cashboxListData}
        columns={columns}
        rowKey="cashboxTable"
        // pagination={{
        //   defaultCurrent:1,
        //   current: listOfCustomerData?.currentPage+1,
        //   pageSize: pagination.pageSize,
        //   total: listOfCustomerData?.totalItems,
        //   onChange: (page, pageSize) => {
        //     setPagination({ page, pageSize });
        //     setSearchCustomerData(form.getFieldsValue().name);
        //     dispatch(searchCustomers(searchCustomerData, page, pageSize));
        //   },
        // }}
      ></Table>
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
          rowKey="cashboxAdd"
          handleCancel={handleCancel}
        />
      </Modal>
      <Modal
        title="Kassa məlumatına düzəliş  edilməsi"
        visible={isEditCashboxModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <CashBoxEdit
          cashboxTypeDataStateProps={cashboxTypeDataState}
          rowKey="cashboxEdit"
          handleCancel={handleCancel}
        />
      </Modal>

      <Modal
        title="Kassa məlumatının silinməsi"
        visible={isDeleteCashboxModalVisible}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <CashBoxDelete
          cashboxIdProps={cashboxId}
          rowKey="cashboxDelete"
          handleCancel={handleCancel}
        />
      </Modal>
    </div>
  );
}
