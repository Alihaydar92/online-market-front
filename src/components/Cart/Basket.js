import React, { useState, useEffect } from "react";
import { Table, Button, Space, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart } from "../../redux/actions/cartActions";
import { LeftSquareTwoTone } from "@ant-design/icons";
export default function Basket() {
  const dispatch = useDispatch();
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
    setBasketDataState(basketReducerData);
    console.log(basketReducerData);
  }, [basketReducerData]);

  const handleClear = () => {
    setBasketDataState([]);
  };
  const handlePdf = () => {};
  const removeBasketData = (basketDataId) => {
    console.log("basketDataId", basketDataId);
    dispatch(deleteCart(basketDataId));
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
    {
      title: "Əməliyyat",
      dataIndex: "operation",
      width: "220px",
      render: (text, basketData) => {
        return (
          <Space size="middle">
            <Button
              size="small"
              type="danger"
              onClick={() => removeBasketData(basketData.storeHouseDto.id)}
            >
              Sil
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      {" "}
      <Row style={{marginTop:"10px"}}>
        <Col span={2}>
        <Button
          onClick={handleClear}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Səbəti Təmizlə
        </Button>
        </Col>
       <Col span={2} offset={20}>
       <Button
          onClick={handlePdf}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Pdf-ə çap et
        </Button>
       </Col>
        
      </Row>
      <Table
        // components={components}
        pagination={false}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={basketDataState.items}
        columns={columns}
      />
      <Row style={{ marginTop: "10px" }}>
        <Col span={6} offset={18}>
          <h3>Yekun qiymət: {basketDataState.grandTotal}</h3>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Button
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            {/* <LeftSquareTwoTone style={{ fontSize: "50px", color: "#08c" }}/> */}
            <Link to="/cartList">Satışa davam et</Link>
          </Button>
        </Col>
      </Row>
    </div>
  );
}
