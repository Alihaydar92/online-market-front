import React, { useEffect, useState } from "react";
import { Table, Form, Input, Button,DatePicker, Select, Typography, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  listOfInvoices,
  getInvoiceById,
  getInvoicesByParams,
  listOfInvoiceTypes,
} from "../../redux/actions/invoiceActions";
import { exportPdfOnlyGrid } from "../../redux/actions/pdfActions";
import { fetchCustomers } from "../../redux/actions/customerAction";
import InvoiceShowModal from "./InvoiceShowModal";
import { Excel } from "antd-table-saveas-excel";
const { Option } = Select;
const { Text } = Typography;
const dateFormat = "DD.MM.YYYY";
export default function Invoice() {
  
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [rowIndex, setRowIndex] = useState();
  const [isModalVisible, setIsModalVisible] = useState();
  const [invoiceBaseData, setInvoiceBaseData] = useState();
  const [pagination, setPagination] = useState({ page: 1, pageSize: 15 });
  useEffect(() => {
    dispatch(listOfInvoices(pagination.page, pagination.pageSize, null,false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(listOfInvoiceTypes());
  }, [dispatch]);
  const listOfInvoiceData = useSelector(
    (state) => state.invoiceReducers?.invoiceListData
  );

  const listOfInvoicesTypeData = useSelector(
    (state) => state.invoiceReducers?.invoiceTypeListData
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
      title: "Qaimə tipi",
      dataIndex: "typeDescription",
    },
    {
      title: "Qaimə nömrəsi",
      dataIndex: "invoiceNumber",
      sorter: (a, b) => a.cartNumber.localeCompare(b.cartNumber),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Əlavə olunma tarixi",
      dataIndex: "createdAt",
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
      sortDirections: ["descend", "ascend"],
      render: (text) => moment(text).format("DD.MM.YYYY HH:mm:ss"),
    },
    {
      title: "Yekun məbləğ",
      dataIndex: "total",
      sorter: {
        compare: (a, b) => a.grandTotal - b.grandTotal,
        // multiple: 2,
      },
      type: "float",
      sortType: "asFloat", // you just need to add this
      convert: function (value, model) {
        return parseFloat(Math.round(value * 100) / 100).toFixed(2);
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
    console.log(record);
    setInvoiceBaseData(record);
    setRowIndex(rowIndex);
    dispatch(getInvoiceById(record.id, record.invoiceType));
    showAddModal();
  };

  const pdfExport = () => {
    var col = [
      "№",
      "Qaimə tipi",
      "Qaimə nömrəsi",
      "Əlavə olunma tarixi",
      "Yekun məbləğ",
    ];
    var rows = [];
    console.log(listOfInvoiceData);
    listOfInvoiceData?.pages.forEach((element, index) => {
      console.log(element);
      var temp = [
        index + 1,
        element.typeDescription,
        element.invoiceNumber,
        moment(element.createdAt).format("DD.MM.YYYY"),
        element.total,
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

  const onSearchInvoices = () => {
    form
      .validateFields()
      .then((values) => {
        // if (values.invoiceNumber !== undefined) {
        //   dispatch(getInvoicesByParams(values.invoiceNumber));

        // }
        var searchParam = new Object();
        searchParam.invoiceType = values.invoiceType;
        searchParam.invoiceNumber = values.invoiceNumber;
        searchParam.startAt =moment(values.startDate).format(dateFormat) ;
        searchParam.endAt =moment(values.endDate).format(dateFormat) ;
        dispatch(
          listOfInvoices(pagination.page, pagination.pageSize, searchParam,true)
        );
      })
      .catch((err) => {}, []);
  };

  return (
    <div>
      <Form layout={"inline"} form={form} style={{ marginTop: "20px" }}>
        <Form.Item
          label="Qaimə tipi"
          name="invoiceType"
          rules={[{ required: false, message: "Müştəri adını daxil edin!" }]}
        >
          <Select
            style={{ width: 200 }}
            // onChange={onChangeCustomer}

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
            {listOfInvoicesTypeData.map((invoiceTypeData) => (
              <Option key={invoiceTypeData.id} value={invoiceTypeData.id}>
                {invoiceTypeData.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Qaimə nömrəsi"
          name="invoiceNumber"
          rules={[{ required: false, message: "Qaimə nömrəsini daxil edin!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Başlama tarixi"
          name="startDate"
        
          rules={[
            { required: false, message: "Başlama tarixini  daxil edin!" },
          ]}
        >
        <DatePicker placeholder="tarix aralığını seçin"    type="object" format={dateFormat}/>
        </Form.Item>
        <Form.Item
          label="Bitmə tarixi"
          name="endDate"
        
          rules={[
            { required: false, message: "Başlama tarixini  daxil edin!" },
          ]}
        >
        <DatePicker placeholder="tarix aralığını seçin"   type="object" format={dateFormat} />
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
            onClick={onSearchInvoices}
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
        {/* <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
            onClick={onClickincomePdfExport}
          >
            Mədaxil qəbzi
          </Button>
        </Form.Item> */}
      </Form>

      <Table
        scroll={{ y: 530 }}
        style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={listOfInvoiceData?.pages}
        columns={invoicesListColumns}
        rowKey="invoiceListKey"
        pagination={{
          defaultCurrent: 1,
          current: listOfInvoiceData?.currentPage + 1,
          pageSize: listOfInvoiceData?.pageSize,
          total: listOfInvoiceData?.totalItems,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });

            dispatch(listOfInvoices(page, pageSize));
          },
        }}
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

          pageData.forEach(({ total }) => {
            totalOfGrandTotal += total;
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell>Cəm</Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text
                    style={{
                      color: "#0C9873",
                    }}
                  >
                    {"Səhifə cəm"}
                  </Text>
                  <Text
                    style={{
                      color: "#808080",
                    }}
                  >
                    {" / "}
                  </Text>

                  <Text
                    style={{
                      color: "#FF0000",
                    }}
                  >
                    {"ümumi cəm"}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell>
                  <Text
                    style={{
                      color: "#0C9873",
                    }}
                  >
                    {totalOfGrandTotal?.toFixed(2).toString()}
                  </Text>
                  <Text
                    style={{
                      color: "#808080",
                    }}
                  >
                    {" / "}
                  </Text>
                  <Text
                    style={{
                      color: "#FF0000",
                    }}
                  >
                    {listOfInvoiceData?.sumTotal?.toFixed(2).toString()}
                  </Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      ></Table>

      <Modal
        // transitionName="none"
        // maskTransitionName="fade"

        title={invoiceBaseData?.typeDescription + " Qaimə məlumatları"}
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
          handleCancelInvoice={handleCancel}
          invoiceBaseDataProps={invoiceBaseData}
        ></InvoiceShowModal>
      </Modal>
    </div>
  );
}
