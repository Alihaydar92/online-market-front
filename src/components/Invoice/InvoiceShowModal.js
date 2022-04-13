import React from "react";
import { Button, Form, Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
export default function InvoiceShowModal() {
  const [form] = Form.useForm();
  const invoiceDataById = useSelector(
    (state) => state.invoiceReducers?.invoiceListDataById
  );

  const invoicesByIdColumns = [
    {
      title: "Say",
      dataIndex: "quantity",
    },
    {
      title: "İtirilmiş məbləğ",
      dataIndex: "lostQuantity",
    },
    {
      title: "Güzəşt",
      dataIndex: "discountPercent",
    },
    {
      title: "Güzəşt qiyməti",
      dataIndex: "discount",
    },
    {
      title: "Cəmi",
      dataIndex: "totalPrice",
    },
    {
      title: "Müştəri satış qiyməti",
      dataIndex: "customerSellPrice",
    },
    {
      title: "Digər qiymət",
      dataIndex: "otherPrice",
    },
    {
      title: "Qeyd",
      dataIndex: "note",
    },
  ];
  return (
    <div>
      {/* <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="Say" name="quantity">
          {invoiceDataById.quantity}
        </Form.Item>
        <Form.Item label="Güzəşt" name="discountPercent">
          {invoiceDataById.discountPercent}
        </Form.Item>
        <Form.Item label="Güzəşt qiyməti" name="discount">
          {invoiceDataById.discount}
        </Form.Item>
        <Form.Item label="Cəmi" name="totalPrice">
          {invoiceDataById.totalPrice}
        </Form.Item>
        <Form.Item label="Müştəri satış qiyməti" name="customerSellPrice">
          {invoiceDataById.customerSellPrice}
        </Form.Item>
        <Form.Item label="Digər qiymət" name="otherPrice">
          {invoiceDataById.otherPrice}
        </Form.Item>
        <Form.Item label="Qeyd" name="note">
          {invoiceDataById.note}
        </Form.Item>
      </Form> */}
      <Table
        // scroll={{ y: 530 }}
        // style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={invoiceDataById}
        columns={invoicesByIdColumns}
        rowKey="id"
        pagination={false}
      ></Table>
    </div>
  );
}
