import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button, Select, Typography, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  listOfInvoices,
  getInvoiceById,
  exportPdfOnlyGrid,
} from "../../redux/actions/invoiceActions";
import { fetchCustomers } from "../../redux/actions/customerAction";
import InvoiceShowModal from "./InvoiceShowModal";
import { Excel } from "antd-table-saveas-excel";
const { Option } = Select;
const { Text } = Typography;
export default function Invoice() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [rowIndex, setRowIndex] = useState();
  const [isModalVisible, setIsModalVisible] = useState();
  const [invoiceBaseData, setInvoiceBaseData] = useState();
  useEffect(() => {
    dispatch(listOfInvoices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // const listOfInvoiceData = useSelector(
  //   (state) => state.invoiceReducers?.invoiceListData
  // );
  const listOfInvoiceData = [
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(12),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(88),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
    {
      grandTotal: Number(11),
    },
  ];
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
      title: "Qaimə nömrəsi",
      dataIndex: "cartNumber",
      sorter: (a, b) => a.cartNumber.localeCompare(b.cartNumber),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Əlavə olunma tarixi",
      dataIndex: "createdAt",
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      sortDirections: ["descend", "ascend"],
      render: (text) => moment(text).format("DD.MM.YYYY"),
    },
    {
      title: "Yekun məbləğ",
      dataIndex: "grandTotal",
      sorter: {
        compare: (a, b) => a.grandTotal - b.grandTotal,
        // multiple: 2,
      },
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
    setInvoiceBaseData(record);
    setRowIndex(rowIndex);
    dispatch(getInvoiceById(record.id));
    showAddModal();
  };

  const pdfExport = () => {
    var col = ["№", "Qaimə nömrəsi", "Əlavə olunma tarixi", "Yekun məbləğ"];
    var rows = [];
    console.log(listOfInvoiceData);
    listOfInvoiceData.forEach((element, index) => {
      console.log(element);
      var temp = [
        index + 1,
        element.cartNumber,
        moment(element.createdAt).format("DD.MM.YYYY"),
        element.grandTotal,
      ];

      rows.push(temp);
    });

    dispatch(exportPdfOnlyGrid(col, rows));
  };

  const excelExport = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(invoicesListColumns)
      .addDataSource(listOfInvoiceData)
      .saveAs("Qaimə.xlsx");
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            onClick={pdfExport}
          >
            Pdf-ə export
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            onClick={excelExport}
          >
            Excel-ə export
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
        summary={(pageData) => {
          let totalOfGrandTotal = 0;

          pageData.forEach(({ grandTotal }) => {
            totalOfGrandTotal += grandTotal;
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>Cəm</Table.Summary.Cell>
                <Table.Summary.Cell>
                <Text type="danger">{"Səhifə cəm/ümumi cəm"}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                <Text type="danger">{totalOfGrandTotal.toString().concat("/").concat("999")}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              
           
            </>
          );
        }}
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
          invoiceBaseDataProps={invoiceBaseData}
        ></InvoiceShowModal>
      </Modal>
    </div>
  );
}
