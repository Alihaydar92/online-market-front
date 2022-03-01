import * as actionTypes from "./actionTypes";
import axios from "axios";
import { message, notification } from "antd";
const baseURL = process.env.REACT_APP_BACKEND_URL;

export const addCart = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.post("/carts/add", data).then((response) => {
    if (response.status === 200) {
      console.log("response cart data ", response.data);
      dispatch({
        type: actionTypes.ADD_CART,
        payload: response.data,
      });
      //   notification["success"]({ message: response.data, description: "" });
      //   dispatch(listOfCategories());
    }
  });
};

export const deleteCart = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.post("/carts/delete/" + id).then((response) => {
    if (response.status === 200) {
      console.log("response cart delete  data ", response.data);
      dispatch({
        type: actionTypes.DELETE_CART,
        payload: response.data,
      });
      notification["success"]({ message: response.data, description: "" });
      //   dispatch(listOfCategories());
    }
  });
};
