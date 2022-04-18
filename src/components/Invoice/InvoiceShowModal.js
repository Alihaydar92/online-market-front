import React, { useEffect, useState } from "react";
import { Button, Form, Input, Table, Typography, Space, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { exportPdf } from "../../redux/actions/invoiceActions";
import { getProductImagesByProductId } from "../../redux/actions/productActions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import fontTxt from "../../helpers/fontRobotoBase64";
import moment from "moment";
const logo = require("../../helpers/greenStream.jpeg");
const { Text } = Typography;
export default function InvoiceShowModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const invoicesDataById = useSelector(
    (state) => state.invoiceReducers?.invoiceItemsById
  );
  const imgsByProductId = useSelector(
    (state) => state.productReducers?.productImagesDataByProductId
  );

  useEffect(() => {
    console.log(imgsByProductId);
  }, [imgsByProductId]);
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
      dataIndex: "amount",
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
    {
      title: "Şəkil",
      dataIndex: "operation",

      render: (text, productData) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              type="primary"
              onClick={() =>
                showImgPanel(productData.storeHouseDto.productDto.id)
              }
            >
              Şəkil
            </Button>
          </Space>
        );
      },
    },
  ];

  const pdfExport = () => {
    dispatch(exportPdf(invoicesDataById, props?.invoiceBaseDataProps));
  };

  const showImgPanel = (productId) => {
    console.log(productId);
    dispatch(getProductImagesByProductId(productId));
    setVisible(true);
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
        Pdf-ə exports
      </Button>

      {imgsByProductId?.images?.map((image, index) => (
        <Image
          style={{ display: "none" }}
          src={image["content"]}
          width={200}
          height={200}
          preview={{
            visible,
            src: image["content"],
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        />
      ))}
    </div>
  );
}
