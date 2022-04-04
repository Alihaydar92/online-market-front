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
      dispatch(showAddedBasketItems());
      //   notification["success"]({ message: response.data, description: "" });
      //   dispatch(listOfCategories());
    }
  });
};

export const endSale = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.post("/carts", data).then((response) => {
    if (response.status === 200) {
      console.log("response end sale cart data ", response.data);
      dispatch({
        type: actionTypes.END_SALE,
        payload: response.data,
      });
      dispatch(showAddedBasketItems());
      //   notification["success"]({ message: response.data, description: "" });
      //   dispatch(listOfCategories());
    }
  });
};

export const clearBasket = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/carts/clear").then((response) => {
    if (response.status === 200) {
      console.log("response end sale cart data ", response.data);
      dispatch({
        type: actionTypes.CLEAR_BASKET,
        payload: response.data,
      });
      dispatch(showAddedBasketItems());
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
  axiosInstance.delete("/carts/"+id).then((response) => {
    if (response.status === 200) {
      console.log("response cart delete  data ", response.data);
      dispatch({
        type: actionTypes.DELETE_CART,
        payload: response.data,
      });
      notification["success"]({ message: response.data, description: "" });
        dispatch(showAddedBasketItems());
    }
  });
};

export const showAddedBasketItems = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });

  axiosInstance.get("/carts/user/1").then((response) => {
    console.log(response.data)
    if (response.status === 200) {
      dispatch({
        type: actionTypes.SHOW_BASKET_ITEMS,
        payload: response.data,
      });
    }
  });
};
