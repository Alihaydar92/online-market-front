import * as actionTypes from "./actionTypes";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const cashboxTypeList = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/cashboxtypes").then((response) => {
    dispatch({
      type: actionTypes.CASHBOX_TYPE_LIST,
      payload: response.data,
    });
  });
};
export const cashboxById = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/cashboxes/" + id).then((response) => {
    dispatch({
      type: actionTypes.CASHBOX_BY_ID,
      payload: response.data,
    });
  });
};
export const cashboxList = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/cashboxes").then((response) => {
    dispatch({
      type: actionTypes.CASHBOX_LIST,
      payload: response.data,
    });
  });
};
export const cashboxAdd = (data) => (dispatch) => {
  console.log("cashbox add action", data);
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.post("/cashboxes", data).then((response) => {
    console.log(response);
    dispatch({
      type: actionTypes.CASHBOX_ADD,
      payload: response.data,
    });
    dispatch(cashboxList());
  });
};

export const cashboxUpdate = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.put("/cashboxes/" + data.id, data).then((response) => {
    console.log(response);
    dispatch({
      type: actionTypes.CASHBOX_UPDATE,
      payload: response.data,
    });
    dispatch(cashboxList());
  });
};

export const cashboxDelete = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.delete("/cashboxes/" + id).then((response) => {
    console.log(response);
    dispatch({
      type: actionTypes.CASHBOX_DELETE,
      payload: response.data,
    });
    dispatch(cashboxList());
  });
};

export const incomeCostList = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/profit-expense").then((response) => {
    console.log(response);
    dispatch({
      type: actionTypes.INCOME_COST_LIST,
      payload: response.data,
    });
  });
};

export const incomeCostAdd = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.post("/profit-expense", data).then((response) => {
    console.log(response);
    dispatch({
      type: actionTypes.INCOME_COST_ADD,
      payload: response.data,
    });
    dispatch(incomeCostList());
  });
};

export const getIncomeCostByTypeId = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance
    .get("/cashboxtypes/" + id + "/profit-expense")
    .then((response) => {
      console.log(response);
      dispatch({
        type: actionTypes.INCOME_COST_BY_TYPE_ID,
        payload: response.data,
      });
    });
};
