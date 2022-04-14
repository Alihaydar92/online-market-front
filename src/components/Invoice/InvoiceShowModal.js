import React from "react";
import { Button, Form, Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { exportPdf } from "../../redux/actions/invoiceActions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import fontTxt from "../../helpers/fontRobotoBase64";
import moment from "moment";
const logo = require("../../helpers/greenStream.jpeg");

export default function InvoiceShowModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const invoicesDataById = useSelector(
    (state) => state.invoiceReducers?.invoiceItemsById
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

  const pdfExport = () => {
    dispatch(
      exportPdf(
        invoicesDataById,
        props?.invoiceBaseDataProps
      )
    );
  };
  return (
    <div>
      <Table
        // scroll={{ y: 530 }}
        // style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={invoicesDataById}
        columns={invoicesByIdColumns}
        rowKey="id"
        pagination={false}
      ></Table>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          position: "absolute",
          left: "800px",
          bottom: "10px",
          backgroundColor: "#0C9873",
          borderColor: "#0C9873",
        }}
        onClick={pdfExport}
      >
        Pdf-ə export
      </Button>
    </div>
  );
}
