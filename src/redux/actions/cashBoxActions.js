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
