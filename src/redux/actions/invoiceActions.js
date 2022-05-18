import * as actionTypes from "./actionTypes";
import axios from "axios";
import { showLoader, hideLoader } from "../actions/loaderActions";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const listOfInvoices = (page,pageSize,searchParams,isFromSearchPagination) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });

  var invoiceParams = new Object();
    console.log(searchParams);
    if (searchParams !== null) {
      invoiceParams = searchParams;

      if (isFromSearchPagination) {
        invoiceParams.page = page - 1;
      } else {
        invoiceParams.page = 0;
      }
    } else {
      invoiceParams.page = page - 1;
    }
    invoiceParams.size = pageSize;
  dispatch(showLoader());
  axiosInstance.get("/invoices" ,{params:invoiceParams}).then((response) => {
    console.log(response.data);
    dispatch({
      type: actionTypes.LIST_OF_INVOICES,
      payload: response.data,
    });
    dispatch(hideLoader());
  });
};

export const getInvoiceById = (invoiceId,invoiceType) => (dispatch) => {
  console.log('invoiceId,invoiceType: ',invoiceId,invoiceType)
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance
    .get("/invoices/" + invoiceId +"/"+invoiceType+ "/invoiceItems")
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



