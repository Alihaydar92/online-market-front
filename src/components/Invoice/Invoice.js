import React, { useEffect,useState } from "react";
import { Table, Form, Input, Button, Select, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  listOfInvoices,
  getInvoiceById,
} from "../../redux/actions/invoiceActions";
import { fetchCustomers } from "../../redux/actions/customerAction";
const { Option } = Select;
export default function Invoice() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [rowIndex, setRowIndex] = useState();
  useEffect(() => {
    dispatch(listOfInvoices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const listOfInvoiceData = useSelector(
    (state) => state.invoiceReducers?.invoiceListData
  );

  const invoiceDataById = useSelector(
    (state) => state.invoiceReducers?.invoiceListDataById
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

  const invoicesByIdColumns = [
    {
      title: "Say",
      dataIndex: "quantity",
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

  const invoiceRowClick = (record, rowIndex) => {
    console.log(record.id);
    setRowIndex(rowIndex);
    dispatch(getInvoiceById(record.id));
  };
  return (
    <div>
      <Row>
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
            rules={[
              { required: false, message: "FTP İStifadəçini daxil edin!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tarix aralığı"
            name="dateRange"
            rules={[
              { required: false, message: "Tarix aralığını  daxil edin!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Məbləğ"
            name="price"
            rules={[
              { required: false, message: "Tarix aralığını  daxil edin!" },
            ]}
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
      </Row>
      <Row>
        <Col span={11}>
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
            rowClassName={(record ,index)=>(index===rowIndex)?"tableRowColor":""}
           
          ></Table>
        </Col>

        <Col span={11} offset={1}>
          <Table
            scroll={{ y: 530 }}
            style={{ marginTop: "20px", wordBreak: "break-word" }}
            dataSource={invoiceDataById}
            columns={invoicesByIdColumns}
            rowKey="id"
          ></Table>
        </Col>
      </Row>
    </div>
  );
}
