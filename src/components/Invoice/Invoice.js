import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, Select, Col, Row, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  listOfInvoices,
  getInvoiceById,
} from "../../redux/actions/invoiceActions";
import { fetchCustomers } from "../../redux/actions/customerAction";
import InvoiceShowModal from "./InvoiceShowModal";
const { Option } = Select;
export default function Invoice() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [rowIndex, setRowIndex] = useState();
  const [isModalVisible, setIsModalVisible] = useState();
  useEffect(() => {
    dispatch(listOfInvoices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const listOfInvoiceData = useSelector(
    (state) => state.invoiceReducers?.invoiceListData
  );

 
  const fetchCustomerData = useSelector(
    (state) => state.customerReducer?.fetchCustomerData
  );
  const listOfExpeditorData = useSelector(
    (state) => state.expeditorReducers?.expeditorListData
  );
  useEffect(() => {
    console.log(listOfInvoiceData);
  }, [listOfInvoiceData]);
  const invoicesListColumns = [
    {
      title: "Müştəri",
      dataIndex: ["customerDto", "name"],
    },
    {
      title: "Satıcı",
      dataIndex: ["sellerDto", "name"],
    },
    {
      title: "Qeyd",
      dataIndex: "note",
    },
    {
      title: "Yekun məbləğ",
      dataIndex: "grandTotal",
    },
  ];

  
  const showAddModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const invoiceRowClick = (record, rowIndex) => {
    console.log(record.id);
    setRowIndex(rowIndex);
    dispatch(getInvoiceById(record.id));
    showAddModal();
  };
  return (
    <div>
      <Form layout={"inline"} form={form} style={{ marginTop: "20px" }}>
        <Form.Item
          label="Müştəri"
          name="customer"
          rules={[{ required: false, message: "Müştəri adını daxil edin!" }]}
        >
          <Select
            style={{ width: 200 }}
            // onChange={onChangeCustomer}
            disabled={true}
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
            {fetchCustomerData.map((customerData) => (
              <Option key={customerData.id} value={customerData.id}>
                {customerData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Qaimə nömrəsi"
          name="invoiceNumber"
          rules={[{ required: false, message: "FTP İStifadəçini daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tarix aralığı"
          name="dateRange"
          rules={[{ required: false, message: "Tarix aralığını  daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Məbləğ"
          name="price"
          rules={[{ required: false, message: "Tarix aralığını  daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
            // disabled={userSysInfoAddButtonDisable}
            // onClick={onAddUserSysInfo}
            type="primary"
          >
            Axtar
          </Button>
        </Form.Item>
      </Form>

      <Table
        scroll={{ y: 530 }}
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={listOfInvoiceData}
        columns={invoicesListColumns}
        rowKey="invoiceListKey"
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              invoiceRowClick(record, rowIndex);
            },
          };
        }}
        // rowClassName={(record, index) => {
        //   return index === rowIndex ? "bg-red" : "";
        // }}
        rowClassName={(record, index) =>
          index === rowIndex ? "tableRowColor" : ""
        }
      ></Table>

     
      <Modal
        title="Qaimə məlumatları"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <InvoiceShowModal
          rowKey="id"
          handleCancel={handleCancel}
        ></InvoiceShowModal>
      </Modal>
    </div>
  );
}
