import React, { useState, useEffect } from "react";
import { Table, Button, Space, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart } from "../../redux/actions/cartActions";
import Cookies from "universal-cookie";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import fontTxt from "../../helpers/fontRobotoBase64";
export default function Basket() {
  var EDV=99;
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [basketArray, setBasketArray] = useState();
  const [grandTotal, setGrandTotal] = useState();
  // var arr = [];

  useEffect(() => {
    setBasketArray(cookies.get("basketArray"));
    setGrandTotal(cookies.get("grandTotal"));
  }, []);

  const handleClear = () => {
    // setBasketDataState([]);
    cookies.remove("basketArray");
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

  const openPdf = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addFileToVFS("Roboto-Regular-normal.ttf", fontTxt);
    pdf.addFont("Roboto-Regular-normal.ttf", "Roboto-Regular", "normal");
    ////////////////////////////// basliq yazilar
    pdf.setFont("Roboto-Regular");
    pdf.text(15, 10, "Alıcı: ");
    pdf.text(45, 10, "Bilgəh tikinti materialları 707(050-426-22-88 Vugar)");
    pdf.text(15, 20, "Ekspeditor: ");
    pdf.text(45, 20, "Zaur quliyev 055-208-49-46");
    pdf.text(15, 30, "Anbar: ");
    pdf.text(45, 30, "Əsas Anbar 1 (DƏRNƏGÜL)");
    ///////////////////////////////////////////////////

    /////////////////////////cedvel
    var col = ["Nomre","Say","Barkod", "Qiymet", "Ümumi cem"];
    var rows = [];

    basketArray.forEach((element,index) => {
      console.log(element);
      var temp = [
        index+1,
        element.quantity,
        element.barcode,
        element.storeHouseDto.price,
        element.totalPrice,
      ];

      rows.push(temp);
    });
    let finalY = pdf.autoTable.previous.finalY;
    pdf.autoTable(col, rows, { startY: 35 });
    /////////////////////////////////////////////
    pdf.text(45, finalY + 10, "Məbləğ");
    pdf.text(170, finalY + 10, grandTotal);
    pdf.text(45, finalY + 20, "ƏDV");
    pdf.text(170, finalY + 20, EDV.toString());
    pdf.text(45, finalY + 30, "Məbləğ Cəm");
    pdf.text(170, finalY + 30, (grandTotal+EDV).toString());
   
    pdf.text(45, finalY + 40, "Yekun");
    pdf.text(170, finalY + 40, (grandTotal+EDV).toString());
    pdf.text(45, finalY + 50, "Kontragentin qalıq borcu");
    pdf.text(170, finalY + 50, "1000");
    pdf.save("pdf");
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
          <h3>Yekun qiymət: {grandTotal}</h3>
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
