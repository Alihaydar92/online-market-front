import * as actionTypes from "./actionTypes";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import fontTxt from "../../helpers/fontRobotoBase64";
const logo = require("../../helpers/greenStream.jpeg");
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const listOfInvoices = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/invoices", {}).then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_INVOICES,
      payload: response.data,
    });
  });
};

export const getInvoiceById = (invoiceId) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance
    .get("/invoices/" + invoiceId + "/invoiceItems")
    .then((response) => {
      dispatch({
        type: actionTypes.GET_INVOICE_BY_ID,
        payload: response.data,
      });
    });
};

export const exportPdf = (arrayData, objectData) => {
  const EDVPersent = 0.18;
  const EDV = Number(
    Math.round(objectData?.grandTotal * EDVPersent * 100) / 100
  );

  const totalPrice = objectData?.grandTotal - EDV;
  const finalPrice = objectData?.grandTotal;

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
  pdf.text("Qaimə nömrə : " + objectData?.cartNumber, 195, 40, {
    align: "right",
  });
  /////
  pdf.text(15, 50, "Alıcı: ");
  pdf.text(45, 50, objectData?.customerDto?.name);
  pdf.line(45, 51, 195, 51);
  pdf.text(15, 60, "Ekspeditor: ");
  pdf.text(45, 60, objectData?.sellerDto?.name);
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
  console.log(arrayData);
  arrayData.forEach((element, index) => {
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
  pdf.text(170, finalY + 10, totalPrice.toFixed(2));
  pdf.line(150, finalY + 11, 195, finalY + 11);

  pdf.text(45, finalY + 20, "ƏDV");
  pdf.text(170, finalY + 20, EDV.toFixed(2));
  pdf.line(150, finalY + 21, 195, finalY + 21);
  pdf.text(45, finalY + 30, "Məbləğ Cəm");
  pdf.text(170, finalY + 30, objectData?.grandTotal.toFixed(2));
  pdf.line(150, finalY + 31, 195, finalY + 31);
  pdf.text(45, finalY + 40, "Yekun");
  pdf.text(170, finalY + 40, finalPrice.toFixed(2));
  pdf.line(150, finalY + 41, 195, finalY + 41);
  pdf.text(45, finalY + 50, "Kontragentin qalıq borcu");
  pdf.text(170, finalY + 50, objectData?.customerDto?.dept.toFixed(2));

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
export const exportPdfOnlyGrid = (col, rows) => {
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
  /////////////////////////cedvel

  pdf.autoTable({
    head: [col],
    body: rows,
    startY: 30,
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
  });
  pdf.save("Qaimə");
};
