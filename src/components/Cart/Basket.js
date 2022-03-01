import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { useSelector } from "react-redux";
export default function Basket() {
  const basketReducerData = useSelector(
    (state) => state.cartReducers?.basketData
  );

  const [basketDataState, setBasketDataState] = useState([]);

  useEffect(() => {
    // const newData = {
    //   key: count,
    //   name: `Edward King ${count}`,
    //   age: '32',
    //   address: `London, Park Lane no. ${count}`,
    // };
    // this.setState({
    //   dataSource: [...dataSource],
    //   count: count + 1,
    // });
    // setBasketDataState(basketReducerData)
  }, [basketReducerData]);

  const handleAdd = () => {
    console.log(basketDataState);
    const { dataSource1 } = basketDataState;
    // setBasketDataState([dataSource:[...dataSource1,basketDataState[0]]])
  };
  const columns = [
    {
      title: "Say",
      dataIndex: "quantity",
    },
    {
      title: "Qiymət",
      dataIndex: ["storeHouseDto", "price"],
    },
    {
      title: "Ümumi cəm",
      dataIndex: "totalPrice",
    },
  ];

  return (
    <div>
      {" "}
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Table
        // components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={basketDataState}
        columns={columns}
      />
    </div>
  );
}
