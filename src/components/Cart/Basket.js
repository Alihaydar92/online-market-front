import React, { useState, useEffect } from "react";
import { Table, Button, Space, Row, Col, Input, Form, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteCart,
  showAddedBasketItems,
} from "../../redux/actions/cartActions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import fontTxt from "../../helpers/fontRobotoBase64";
import moment from "moment";

export default function Basket() {
  const dispatch = useDispatch();

  const basketItems = useSelector(
    (state) => state.cartReducers?.addBasketItems
  );
  const basketAllData = useSelector(
    (state) => state.cartReducers?.basketAllData
  );
  const [basketArray, setBasketArray] = useState();
  useEffect(() => {
    dispatch(showAddedBasketItems());
  }, [dispatch]);
  useEffect(() => {
    console.log(basketItems);
  }, [basketItems]);

  useEffect(() => {
    setBasketArray(basketItems);
  }, [basketItems]);

  // var arr = [];
  const EDVPersent = 0.18;
  const EDV = Number(
    Math.round(basketAllData.grandTotal * EDVPersent * 100) / 100
  );

  const totalPrice = EDV + basketAllData.grandTotal;
  const finalPrice = EDV + basketAllData.grandTotal;
  // useEffect(() => {
  //   setBasketArray(cookies.get("basketArray"));
  //   setGrandTotal(Number(cookies.get("grandTotal")));
  //   setCustomerDto(cookies.get("customerDto"));
  //   setSellerDto(cookies.get("sellerDto"));
  // }, []);

  const handleClear = () => {
    // setBasketDataState([]);
    // cookies.remove("basketArray");
    // setBasketArray([]);
  };

  const removeBasketData = (basketDataId) => {
    console.log("basketDataId", basketDataId);
    dispatch(deleteCart(basketDataId));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: ["storeHouseDto", "id"],
    },
    {
      title: "Barkod",
      dataIndex: ["storeHouseDto", "barcode"],
    },
    {
      title: "Məhsulun adı",
      dataIndex: ["storeHouseDto", "productDto", "name"],
    },
    {
      title: "Say",
      dataIndex: "quantity",
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          value={text}
          onChange={onInputQuantityChange("quantity", index)}
        />
      ),
    },
    {
      title: "Qiymət",
      dataIndex: ["storeHouseDto", "price"],
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          defaultValue={text}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          onChange={onInputPriceChange("price", index)}
        />
      ),
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
  const onInputQuantityChange = (key, index) => (e) => {
    console.log(e);
    console.log(key);
    const newData = [...basketArray];
    newData[index][key] = Number(e);

    setBasketArray(newData);
  };
  const onInputPriceChange = (key, index) => (e) => {
    console.log(e);
    console.log(key);

    const newData = [...basketArray];
    newData[index].storeHouseDto[key] = Number(e);

    setBasketArray(newData);
  };
  const openPdf = () => {
    var callAddFont = function () {
      this.addFileToVFS("Roboto-Regular-normal.ttf", fontTxt);
      this.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular", "normal");
    };

    jsPDF.API.events.push(["addFonts", callAddFont]);
    ////////////////////////////// basliq yazilar
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.setFont("Roboto-Regular");
    //date
    pdf.text(15, 10, "Tarix: " + moment().format("DD.MM.YYYY"));
    pdf.text(140, 10, "Qaimə nömrə : " + "TESTNOMRE");
    /////
    pdf.text(15, 20, "Alıcı: ");
    pdf.text(45, 20, basketAllData.customerDto.name);
    pdf.text(15, 30, "Ekspeditor: ");
    pdf.text(45, 30, basketAllData.sellerDto.name);
    pdf.text(15, 40, "Anbar: ");
    pdf.text(45, 40, "TEST ANBAR");
    ///////////////////////////////////////////////////

    /////////////////////////cedvel
    var col = ["Nömrə", "Say", "Barkod", "Ad", "Qiymət", "Ümumi cəm"];
    var rows = [];
    console.log(basketArray);
    basketArray.forEach((element, index) => {
      console.log(element);
      var temp = [
        index + 1,
        element.quantity,
        element.storeHouseDto.barcode,
        element.storeHouseDto.productDto.name,
        element.price,
        element.totalPrice,
      ];

      rows.push(temp);
    });
    pdf.autoTable({
      head: [col],
      body: rows,
      startY: 55,
      styles: {
        font: "Roboto-Regular", // <-- place name of your font here
        fontStyle: "normal",
      },
      // margin: { bottom: 60 },
    });
    let finalY = pdf.autoTable.previous.finalY;

    /////////////////////////////
    pdf.text(45, finalY + 10, "Məbləğ");
    pdf.text(170, finalY + 10, basketAllData.grandTotal.toString());
    pdf.text(45, finalY + 20, "ƏDV");
    pdf.text(170, finalY + 20, EDV.toString());
    pdf.text(45, finalY + 30, "Məbləğ Cəm");
    pdf.text(170, finalY + 30, totalPrice.toString());

    pdf.text(45, finalY + 40, "Yekun");
    pdf.text(170, finalY + 40, finalPrice.toString());
    // pdf.text(45, finalY + 50, "Kontragentin qalıq borcu");
    // pdf.text(170, finalY + 50, "1000");
    pdf.save("Qaimə");
  };
  const endSales = () => {
    console.log(basketArray);
  };
  return (
    <div>
      {" "}
      <Row style={{ marginTop: "10px" }}>
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
            onClick={openPdf}
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
        pagination={false}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={basketArray}
        columns={columns}
      />
      <Row style={{ marginTop: "10px" }}>
        <Col span={6} offset={18}>
          <h3>Yekun qiymət: {basketAllData.grandTotal}</h3>
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
        <Col span={6} offset={20}>
          <Button
            onClick={endSales}
            type="primary"
            style={{
              marginBottom: 16,
            }}
          >
            {/* <LeftSquareTwoTone style={{ fontSize: "50px", color: "#08c" }}/> */}
            Satışı yekunlaşdır
          </Button>
        </Col>
      </Row>
    </div>
  );
}
