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
    console.log(response.data);
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

export const getInvoicesByParams = (invoiceNum) => (dispatch) => {
  var invoiceParams = {};
  invoiceParams.invoiceNumber = invoiceNum;
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance
    .get("/invoices/params", { params: invoiceParams })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: actionTypes.LIST_OF_INVOICES,
        payload: response.data,
      });
    });
};

export const listOfInvoiceTypes = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/invoiceTypes").then((response) => {
    console.log(response.data);
    dispatch({
      type: actionTypes.LIST_OF_INVOICE_TYPES,
      payload: response.data,
    });
  });
};



