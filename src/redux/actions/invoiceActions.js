import * as actionTypes from "./actionTypes";
import axios from "axios";
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
  axiosInstance.get("/invoices/"+invoiceId+"/invoiceItems").then((response) => {
    dispatch({
      type: actionTypes.GET_INVOICE_BY_ID,
      payload: response.data,
    });
  });
};
