import * as actionTypes from "./actionTypes";
import axios from "axios";
import { message, notification } from "antd";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const showBlackList = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/blacklist").then((response) => {
    dispatch({
      type: actionTypes.SHOW_BLACK_LIST,
      payload: response.data,
    });
  });
};

export const addBlackListCustomer = (id) => (dispatch) => {
  console.log(id);
  var blackListData = new Object();
  blackListData.customerId = id;
  console.log(blackListData);
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.post("/blacklist", blackListData).then((response) => {
    console.log(response.status);
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_BLACK_LIST_CUSTOMER,
        payload: response.data,
      });
      notification["success"]({
        message: "Əməliyyat uğurla yerinə yetirildi",
        description: "",
      });
      dispatch(showBlackList());
    }
  });
};
