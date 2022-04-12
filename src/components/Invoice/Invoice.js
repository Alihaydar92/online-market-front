import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listOfInvoices } from "../../redux/actions/invoiceActions";
export default function Invoice() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOfInvoices());
  }, [dispatch]);

  const listOfInvoiceData = useSelector(
    (state) => state.invoiceReducers?.invoiceListData
  );

  useEffect(()=>{
    console.log(listOfInvoiceData)
  },[listOfInvoiceData])
  const columns = [
    {
      title: "Müştəri",
      dataIndex: "",
    },
    {
      title: "Satıcı",
      dataIndex: "",
    },
    {
      title: "Qeyd",
      dataIndex: "",
    },
    {
      title: "Yekun məbləğ",
      dataIndex: "grandTotal",
    },
  ];
  return (
    <div>
      {" "}
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
