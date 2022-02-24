import React from "react";
import { Button, Table } from "antd";
import { useSelector } from "react-redux";
export default function Basket() {
  const bastketReducerData = useSelector(
    (state) => state.cartReducers?.basketData
  );
  const columns = [
    {
      title: "Say",
      dataIndex: "quantity"
    },
    {
      title: "Qiymət",
      dataIndex: ["productDto","price"],
    },
    {
      title: "Ümumi cəm",
      dataIndex: "totalPrice",
    },
  ];

  return (
    <div>
      {" "}
      {/* <Button
        // onClick={this.handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button> */}
      <Table
        // components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={bastketReducerData}
        columns={columns}
      />
    </div>
  );
}
