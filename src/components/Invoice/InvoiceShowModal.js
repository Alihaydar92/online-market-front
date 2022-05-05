import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Typography,
  Space,
  Image,
  InputNumber,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { exportSalePdf } from "../../redux/actions/pdfActions";
import { getProductImagesByProductId } from "../../redux/actions/productActions";
import InvoiceShowImgPanel from "./InvoiceShowImgPanel";

const { Text } = Typography;
export default function InvoiceShowModal(props) {
  const dispatch = useDispatch();
  const [invoicesStateData, setInvoicesStateData] = useState();
  const [isImgPanelVisible, setIsImgPanelVisible] = useState(false);
  const invoicesDataById = useSelector(
    (state) => state.invoiceReducers?.invoiceItemsById
  );

  useEffect(() => {
    setInvoicesStateData(invoicesDataById);
  }, [invoicesDataById, invoicesStateData]);

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
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          pattern="[0-9]*"
          inputmode="numeric"
          value={text}
          onChange={onInputQuantityChange("quantity", index)}
        />
      ),
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
  const onInputQuantityChange = (key, index) => (e) => {
    console.log(e);
    console.log(key);
    const newData = [...invoicesStateData];
    newData[index][key] = Number(e);

    setInvoicesStateData(newData);
  };
  const pdfExport = () => {
    dispatch(
      exportSalePdf(invoicesStateData, props?.invoiceBaseDataProps, "Qaimə")
    );
  };

  const showImgPanel = (productId) => {
    dispatch(getProductImagesByProductId(productId));
    setIsImgPanelVisible(true);
  };

  const handleCancel = () => {
    setIsImgPanelVisible(false);
   
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
      <Modal
        title="Qaimə şəkillər"
        visible={isImgPanelVisible}
        onCancel={handleCancel}
        width={250}
        height={200}
        footer={[
          <div>
            <Button danger onClick={handleCancel} type="primary">
              Geri
            </Button>
          </div>,
        ]}
      >
        <InvoiceShowImgPanel key={"imgPanelKey"} />
      </Modal>
    </div>
  );
}
