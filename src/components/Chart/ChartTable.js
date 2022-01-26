import React from 'react';
import {Table} from "antd"

export default function ChartTable() {

    
  return <div>
      <Table
        style={{ marginTop: "20px" }}
        //   rowSelection={rowSelection}
        // dataSource={listOfCustomerData}
        // columns={columns}
        rowKey="id"
      ></Table>
  </div>;
}
