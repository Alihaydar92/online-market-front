import React from "react";
import { Button, Form, Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import fontTxt from "../../helpers/fontRobotoBase64";
import moment from "moment";
const logo = require("../../helpers/greenStream.jpeg");

export default function InvoiceShowModal(props) {
  const [form] = Form.useForm();
  const invoicesDataById = useSelector(
    (state) => state.invoiceReducers?.invoiceListDataById
  );

  const invoicesByIdColumns = [
    {
      title: "Say",
      dataIndex: "quantity",
    },
    {
      title: "İtirilmiş məbləğ",
      dataIndex: "lostQuantity",
    },
    {
      title: "Güzəşt",
      dataIndex: "discountPercent",
    },
    {
      title: "Güzəşt qiyməti",
      dataIndex: "discount",
    },
    {
      title: "Cəmi",
      dataIndex: "totalPrice",
    },
    {
      title: "Müştəri satış qiyməti",
      dataIndex: "customerSellPrice",
    },
    {
      title: "Digər qiymət",
      dataIndex: "otherPrice",
    },
    {
      title: "Qeyd",
      dataIndex: "note",
    },
  ];

  const pdfExport = () => {
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
    pdf.text(45, 50, props?.invoiceBaseDataProps?.customerDto?.name);
    pdf.line(45, 51, 195, 51);
    pdf.text(15, 60, "Ekspeditor: ");
    pdf.text(45, 60, props?.invoiceBaseDataProps?.sellerDto?.name);
    pdf.line(45, 61, 195, 61);
    pdf.text(15, 70, "Anbar: ");
    pdf.text(45, 70, "TEST ANBAR");
    pdf.line(45, 71, 195, 71);
    ///////////////////////////////////////////////////

    /////////////////////////cedvel
    var col = [
      "№",
      "Say",
      "İtirilmiş məbləğ",
      "Güzəşt",
      "Güzəştli qiyməti",
      "Cəmi",
      "Müştəri satış qiyməti",
      "Digər qiyməti",
      "Qeyd",
    ];
    var rows = [];
    console.log(invoicesDataById);
    invoicesDataById.forEach((element, index) => {
      console.log(element);
      var temp = [
        index + 1,
        element.quantity,
        element.lostQuantity,
        element.discountPercent,
        element.discount,
        element.totalPrice,
        element.customerSellPrice,
        element.otherPrice,
        element.note,
      ];
      if (element.quantity !== 0) {
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
    // pdf.text(170, finalY + 10, totalPrice.toString());
    pdf.line(150, finalY + 11, 195, finalY + 11);

    pdf.text(45, finalY + 20, "ƏDV");
    // pdf.text(170, finalY + 20, EDV.toString());
    pdf.line(150, finalY + 21, 195, finalY + 21);
    pdf.text(45, finalY + 30, "Məbləğ Cəm");
    // pdf.text(170, finalY + 30, basketAllData?.grandTotal.toString());
    pdf.line(150, finalY + 31, 195, finalY + 31);
    pdf.text(45, finalY + 40, "Yekun");
    // pdf.text(170, finalY + 40, finalPrice.toString());
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
  return (
    <div>
      <Table
        // scroll={{ y: 530 }}
        // style={{ marginTop: "20px", wordBreak: "break-word" }}
        dataSource={invoicesDataById}
        columns={invoicesByIdColumns}
        rowKey="id"
        pagination={false}
      ></Table>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          position: "absolute",
          left: "800px",
          bottom: "10px",
          backgroundColor: "#0C9873",
          borderColor: "#0C9873",
        }}
        onClick={pdfExport}
      >
        Pdf-ə export
      </Button>
    </div>
  );
}
