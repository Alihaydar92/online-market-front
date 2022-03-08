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
import moment from "moment";
export default function Basket() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  // const [basketArray, setBasketArray] = useState();
  const [basketArray, setBasketArray] = useState([{quantity:1,storeHouseDto:{barcode:'fsdfdsfdsf',price:2},totalPrice:12},
  {quantity:2,storeHouseDto:{barcode:'fsdfdsfdsf',price:5},totalPrice:15}]);
 
  const [grandTotal, setGrandTotal] = useState(Number());
  const [customerDto, setCustomerDto] = useState();
  const [sellerDto, setSellerDto] = useState();
  // var arr = [];
  const EDVPersent = 0.18;
  const EDV = Number(Math.round(grandTotal * EDVPersent * 100) / 100);

  const totalPrice = EDV + grandTotal;
  const finalPrice = EDV + grandTotal;
  useEffect(() => {
    // setBasketArray(cookies.get("basketArray"));
    setGrandTotal(Number(cookies.get("grandTotal")));
    setCustomerDto(cookies.get("customerDto"));
    setSellerDto(cookies.get("sellerDto"));
  }, []);
useEffect(()=>{

},[basketArray])
 

  const handleClear = () => {
    // setBasketDataState([]);
    cookies.remove("basketArray");
    setBasketArray([]);
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
    //date
    pdf.text(15, 10, "Tarix: " + moment().format("DD.MM.YYYY"));
    pdf.text(140, 10, "Qaimə nömrə : " + "TESTNOMRE");
    /////
    pdf.text(15, 20, "Alıcı: ");
    pdf.text(45, 20, customerDto.name);
    pdf.text(15, 30, "Ekspeditor: ");
    pdf.text(45, 30, sellerDto.name);
    pdf.text(15, 40, "Anbar: ");
    pdf.text(45, 40, "TEST ANBAR");
    ///////////////////////////////////////////////////

    /////////////////////////cedvel
    var col = ["Nomre", "Say", "Barkod", "Ad", "Qiymet", "Ümumi cəm"];
    var rows = [];

    basketArray.forEach((element, index) => {
      console.log(element);
      var temp = [
        index + 1,
        element.quantity,
        element.storeHouseDto.barcode,
        element.name,
        element.storeHouseDto.price,
        element.totalPrice,
      ];

      rows.push(temp);
    });
    let finalY = pdf.autoTable.previous.finalY;
    pdf.autoTable(col, rows, { startY: 55 },{styles: {
      font: 'Roboto-Regular',
      fontStyle: 'normal',
    }});
    // pdf.autoTable({
    //   col,
    //   // col:[
    //   //   { header: 'Nomre', dataKey: 'index' },
    //   //   { header: 'Say', dataKey: 'quantity' },
    //   //   { header: 'Barkod', dataKey: 'barcode' },
    //   //   { header: 'Ad', dataKey: 'productName' },
    //   //   { header: 'Qiymet', dataKey: 'price' },
    //   //   { header: 'Ümumi cem', dataKey: 'totalProce' },
    //   // ],
    //   col :["Nomre","Say","Barkod","Ad", "Qiymet", "Ümumi cem"],
    //   body:rows,
    //   margin:{top:35},
    //   didDrawPage:function(data){

    // }})

    /////////////////////////////////////////////
    pdf.text(45, finalY + 10, "Məbləğ");
    pdf.text(170, finalY + 10, grandTotal.toString());
    pdf.text(45, finalY + 20, "ƏDV");
    pdf.text(170, finalY + 20, EDV.toString());
    pdf.text(45, finalY + 30, "Məbləğ Cəm");
    pdf.text(170, finalY + 30, totalPrice.toString());

    pdf.text(45, finalY + 40, "Yekun");
    pdf.text(170, finalY + 40, finalPrice.toString());
    // pdf.text(45, finalY + 50, "Kontragentin qalıq borcu");
    // pdf.text(170, finalY + 50, "1000");
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
