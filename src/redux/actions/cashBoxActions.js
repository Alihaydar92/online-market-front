import * as actionTypes from "./actionTypes";
import axios from "axios";
import { message, notification } from "antd";
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

export const cashboxAdd = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.post("/cashboxes",data).then((response) => {
    console.log(response)
    dispatch({
      type: actionTypes.CASHBOX_ADD,
      payload: response.data,
    });
  });
};
