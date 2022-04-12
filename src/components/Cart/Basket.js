import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Row,
  Col,
  Input,
  Form,
  InputNumber,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  showAddedBasketItems,
  endSale,
  clearBasket,
  updateBasket,
} from "../../redux/actions/cartActions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import fontTxt from "../../helpers/fontRobotoBase64";
import moment from "moment";
import BasketDelete from "./BasketDelete";
import TextArea from "antd/lib/input/TextArea";
const logo = require("../../helpers/greenStream.jpeg");
export default function Basket() {
  const dispatch = useDispatch();
  const [isSilModalVisible, setIsSilModalVisible] = useState(false);
  const [basketId, setBasketId] = useState();
  const [basketNote, setBasketNote] = useState();
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
    console.log(basketItems);
  }, [basketItems, basketArray]);

  useEffect(() => {
    console.log(basketArray);
  }, [basketArray]);
  const EDVPersent = 0.18;
  const EDV = Number(
    Math.round(basketAllData?.grandTotal * EDVPersent * 100) / 100
  );

  const totalPrice = basketAllData?.grandTotal - EDV;
  const finalPrice = basketAllData?.grandTotal;

  const handleClear = () => {
    dispatch(clearBasket());
  };
  const showRemoveModal = (id) => {
    setBasketId(id);

    setIsSilModalVisible(true);
  };
  const handleCancel = () => {
    setIsSilModalVisible(false);
  };

  const editBasketData = (basketData) => {
    console.log(basketData);
    dispatch(updateBasket(basketData));
    dispatch(showAddedBasketItems());
  };

  const columns = [
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
      dataIndex: ["storeHouseDto", "sellPrice"],
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          min={0}
          defaultValue={text}
          formatter={(value) =>
            // `${value}`.replace(/(\.\d{2})\d*/, "$1").replace(/(\d)(?=(\d{3})+\b)/g, "$1,")
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
          parser={(value) =>
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
          onChange={onInputPriceChange("sellPrice", index)}
        />
      ),
    },
    {
      title: "Güzəşt",
      dataIndex: "discountPercent",
      editable: true,
      render: (text, record, index) => (
        <InputNumber
          defaultValue={text}
          min={0}
          max={100}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace("%", "")}
          onChange={onInputDiscountPercent("discountPercent", index)}
        />
      ),
    },
    {
      title: "Güzəştli qiyməti",
      dataIndex: "discount",

      render: (text, record, index) => (
        <InputNumber
          defaultValue={text}
          editable={false}
          disabled={true}
          formatter={(value) =>
            // `${value}`.replace(/(\.\d{2})\d*/, "$1").replace(/(\d)(?=(\d{3})+\b)/g, "$1,")
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
          parser={(value) =>
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
        />
      ),
    },
    {
      title: "Ümumi cəm",
      dataIndex: "totalPrice",
      render: (text, record, index) => (
        <InputNumber
          min={0}
          defaultValue={text}
          editable={false}
          disabled={true}
          formatter={(value) =>
            // `${value}`.replace(/(\.\d{2})\d*/, "$1").replace(/(\d)(?=(\d{3})+\b)/g, "$1,")
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
          parser={(value) =>
            parseFloat(value)
              .toFixed(2)
              .replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,")
              .replace(".00", "")
          }
        />
      ),
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
              onClick={() => showRemoveModal(basketData.storeHouseDto.id)}
            >
              Sil
            </Button>
            <Button
              style={{ backgroundColor: "#0C9873", borderColor: "#0C9873" }}
              size="small"
              type="primary"
              onClick={() => editBasketData(basketData)}
            >
              Dəyişikliyi təsdiqlə
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

  const onInputDiscountPercent = (key, index) => (e) => {
    const newData = [...basketArray];
    newData[index][key] = Number(e);

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

    pdf.addImage(String(logo), "jpeg", 15, 10, 50, 15);
    pdf.setFont("Roboto-Regular");
    pdf.setFontSize(12);
    //date
    pdf.text(15, 40, "Tarix: " + moment().format("DD.MM.YYYY"));
    pdf.line(15, 42, 195, 42);
    pdf.line(15, 34, 195, 34);
    pdf.text("Satış", 195, 15, { align: "right" });
    pdf.text("Ofis: " + "055 203-60-10", 195, 30, { align: "right" });
    pdf.text("Qaimə nömrə : " + "01234567", 195, 40, { align: "right" });
    /////
    pdf.text(15, 50, "Alıcı: ");
    pdf.text(45, 50, basketAllData?.customerDto?.name);
    pdf.line(45, 51, 195, 51);
    pdf.text(15, 60, "Ekspeditor: ");
    pdf.text(45, 60, basketAllData?.sellerDto?.name);
    pdf.line(45, 61, 195, 61);
    pdf.text(15, 70, "Anbar: ");
    pdf.text(45, 70, "TEST ANBAR");
    pdf.line(45, 71, 195, 71);
    ///////////////////////////////////////////////////

    /////////////////////////cedvel
    var col = [
      "№",
      "Barkod",
      "Adı",
      "Sayı",
      "Qiyməti",
      "Məbləğ",
      "Güzəşt",
      "Güzəştli qiyməti",
      "Cəmi",
    ];
    var rows = [];
    console.log(basketArray);
    basketArray.forEach((element, index) => {
      console.log(element);
      var temp = [
        index + 1,
        element.storeHouseDto.barcode,

        element.storeHouseDto.productDto.name,
        element.quantity,
        element.storeHouseDto.sellPrice.toFixed(2),
        (
          Number(element.quantity) * Number(element.storeHouseDto.sellPrice)
        ).toFixed(2),
        element.discountPercent + " %",
        element.discount,
        element.totalPrice,
      ];
if(element.quantity!==0){
  rows.push(temp);
}
      
    });
    pdf.autoTable({
      head: [col],
      body: rows,
      startY: 80,
      theme: "grid",

      headStyles: {
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        // fillColor: [33, 150, 243],
        lineWidth: 0.5,
        fillColor: [255, 255, 255],
        // lineColor: [255, 255, 255],
      },
      styles: {
        font: "Roboto-Regular", // <-- place name of your font here
        fontStyle: "normal",
      },
      bodyStyles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
      },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 32 },
        2: { cellWidth: 40 },
        3: { cellWidth: 14 },
        4: { cellWidth: 16 },
        5: { cellWidth: 20 },
        6: { cellWidth: 15 },
        7: { cellWidth: 16 },
        8: { cellWidth: 20 },

        // etc
      },

      // margin: { bottom: 60 },
    });
    let finalY = pdf.autoTable.previous.finalY;

    /////////////////////////////
    pdf.setDrawColor(0, 0, 0);
    pdf.text(45, finalY + 10, "Məbləğ");
    pdf.text(170, finalY + 10, totalPrice.toString());
    pdf.line(150, finalY + 11, 195, finalY + 11);

    pdf.text(45, finalY + 20, "ƏDV");
    pdf.text(170, finalY + 20, EDV.toString());
    pdf.line(150, finalY + 21, 195, finalY + 21);
    pdf.text(45, finalY + 30, "Məbləğ Cəm");
    pdf.text(170, finalY + 30, basketAllData?.grandTotal.toString());
    pdf.line(150, finalY + 31, 195, finalY + 31);
    pdf.text(45, finalY + 40, "Yekun");
    pdf.text(170, finalY + 40, finalPrice.toString());
    pdf.line(150, finalY + 41, 195, finalY + 41);
    pdf.text(45, finalY + 50, "Kontragentin qalıq borcu");
    pdf.text(170, finalY + 50, "1000");
    pdf.line(150, finalY + 51, 195, finalY + 51);

    pdf.setLineDash([2, 2], 0);
    pdf.line(15, finalY + 55, 195, finalY + 55);
    pdf.text(15, finalY + 80, "Təhvil verdi");
    pdf.text(15, finalY + 90, "Təhvil aldı");
    pdf.setLineDash();
    pdf.setDrawColor(0, 0, 0);
    pdf.line(140, finalY + 80, 195, finalY + 80);
    pdf.line(140, finalY + 90, 195, finalY + 90);
    pdf.setFontSize(7);
    // pdf.setFontStyle("italic")
    pdf.text("Imza", 165, finalY + 83);
    pdf.text("Imza", 165, finalY + 93);
    pdf.save("Qaimə");
  };
  const endSales = () => {
    var endSalesData = new Object();
    endSalesData.customerId = basketAllData.customerId;
    endSalesData.customerDto = basketAllData.customerDto;
    endSalesData.sellerDto = basketAllData.sellerDto;
    endSalesData.sellerId = basketAllData.sellerId;
    endSalesData.note = basketNote === undefined ? "" : basketNote;
    endSalesData.grandTotal = basketAllData.grandTotal;

    var result = basketArray.reduce(function (map, obj) {
      let key = obj.storeHouseDto.id.toString();
      map[key] = obj;
      return map;
    }, {});
    // endSalesData.items= JSON.stringify({...result});
    endSalesData.items = result;
    console.log(basketArray);

    console.log(endSalesData);

    dispatch(endSale(endSalesData));
  };
  const onChangeNote = (note) => [
    setBasketNote(note.target.value === undefined ? "" : note.target.value),
  ];
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
              backgroundColor: "#ff7400",
              borderColor: "#ff7400",
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
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
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
      <Row>
        <h4>Qeyd:</h4>

        <TextArea onChange={onChangeNote}></TextArea>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col span={6} offset={18}>
          <h3>Yekun qiymət: {basketAllData?.grandTotal}</h3>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Button
            type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
          >
            {/* <LeftSquareTwoTone style={{ fontSize: "50px", color: "#08c" }}/> */}
            <Link to="/cartList">Satışa davam et</Link>
          </Button>
        </Col>
        <Col span={6} offset={12}>
          <Button
            onClick={endSales}
            type="primary"
            style={{
              marginBottom: 16,
              backgroundColor: "#0C9873",
              borderColor: "#0C9873",
            }}
          >
            {/* <LeftSquareTwoTone style={{ fontSize: "50px", color: "#08c" }}/> */}
            Satışı yekunlaşdır
          </Button>
        </Col>
      </Row>
      <Modal
        title="Səbət məlumatının silinməsi"
        visible={isSilModalVisible}
        pagin
        onCancel={handleCancel}
        footer={[
          <Button danger onClick={handleCancel} type="primary">
            Geri
          </Button>,
        ]}
      >
        <BasketDelete
          rowKey="id"
          basketIdProps={basketId}
          handleCancel={handleCancel}
        ></BasketDelete>
      </Modal>
    </div>
  );
}
