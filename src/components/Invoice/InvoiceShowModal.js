import React from "react";
import { Button, Form, Input, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { exportPdf } from "../../redux/actions/invoiceActions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import fontTxt from "../../helpers/fontRobotoBase64";
import moment from "moment";
const logo = require("../../helpers/greenStream.jpeg");
const { Text } = Typography;
export default function InvoiceShowModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const invoicesDataById = useSelector(
    (state) => state.invoiceReducers?.invoiceItemsById
  );

  const invoicesByIdColumns = [
    {
      title: "Barkod",
      dataIndex: ["storeHouseDto", "barcode"],
    },
    {
      title: "Adı",
      dataIndex: ["storeHouseDto", "productDto", "name"],
    },
    {
      title: "Say",
      dataIndex: "quantity",
    },
    {
      title: "Qiyməti",
      dataIndex: ["storeHouseDto", "sellPrice"],
    },
    {
      title: "Məbləğ",
      dataIndex: "",
    },
    {
      title: "Güzəşt",
      dataIndex: "discountPercent",
    },
    {
      title: "Güzəştli qiyməti",
      dataIndex: "discount",
    },
    {
      title: "Cəmi",
      dataIndex: "totalPrice",
    },
  ];

  const pdfExport = () => {
    dispatch(exportPdf(invoicesDataById, props?.invoiceBaseDataProps));
  };
  return (
    <div>
      <Table
        bordered
        // scroll={{ y: 530 }}
        // style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={invoicesDataById}
        columns={invoicesByIdColumns}
        rowKey="id"
        pagination={false}
        summary={(pageData) => {
          let totalBorrow = 0;

          pageData.forEach(({ totalPrice }) => {
            totalBorrow += totalPrice;
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>Cəm</Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell></Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text type="danger">{totalBorrow}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
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
