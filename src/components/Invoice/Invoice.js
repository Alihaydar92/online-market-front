import React, { useEffect } from "react";
import { Table, Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listOfInvoices } from "../../redux/actions/invoiceActions";

const { Option } = Select;
export default function Invoice() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(listOfInvoices());
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
  const columns = [
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
  return (
    <div>
      {" "}
      <Form layout={"inline"} form={form} style={{ marginTop: "20px" }}>
        <Form.Item
          label="Müştəri"
          name="customer"
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
            {fetchCustomerData.map((customerData) => (
            <Option key={customerData.id} value={customerData.id}>
              {customerData.name}
            </Option>
          ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Satıcı"
          name="expeditor"
          rules={[{ required: false, message: "Satıcı adını daxil edin!" }]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
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
            {listOfExpeditorData.map((expeditorData) => (
              <Option key={expeditorData.id} value={expeditorData.id}>
                {expeditorData.name}
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
        //   rowSelection={rowSelection}
        dataSource={listOfInvoiceData}
        columns={columns}
        rowKey="id"
      ></Table>
    </div>
  );
}
