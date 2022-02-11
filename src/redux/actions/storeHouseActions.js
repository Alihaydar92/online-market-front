import * as actionTypes from "./actionTypes";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const listOfStoreHouse = (page, pageSize) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance
    .get("/storehouse?page=" + (page - 1) + "&size=" + pageSize)
    .then((response) => {
      dispatch({
        type: actionTypes.LIST_OF_STOREHOUSE,
        payload: response.data,
      });
    });
};
export const getStoreHouseById = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/storehouse/" + id).then((response) => {
    console.log("response ", response.data);
    dispatch({
      type: actionTypes.GET_STOREHOUSE_BY_ID,
      payload: response.data,
    });
  });
};

export const addStoreHouse = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.post("/storehouse", data).then((response) => {
    console.log("add store house ", response.status);
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_STOREHOUSE,
        payload: response.data,
      });
      dispatch(listOfStoreHouse());
    }
  });
};

export const updateStoreHouse = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  console.log("update product data ", data);
  axiosInstance.put("/storehouse/" + data.id, data).then((response) => {
    console.log(response.status);
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_STOREHOUSE,
        payload: response.data,
      });
      dispatch(listOfStoreHouse());
    }
  });
};

export const deleteStoreHouse = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.delete("/storehouse/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_STOREHOUSE,
        payload: response.data,
      });
      dispatch(listOfStoreHouse());
    }
  });
};

export const listOfQuantities = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/storehouse/quantities").then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.LIST_OF_QUANTITIES,
        payload: response.data,
      });
    }
  });
};

export const getStoreHouseByBarcode =
  (barcode, page, pageSize) => (dispatch) => {
    const axiosInstance = axios.create({
      baseURL: baseURL,
      auth: {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      },
    });
    var storeHouseParams = new Object();

    storeHouseParams.page = page - 1;

    storeHouseParams.size = pageSize;
    axiosInstance
      .get("/storehouse/barcode/" + barcode, { params: storeHouseParams })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.GET_STORE_HOUSE_BY_BARCODE,
            payload: response.data,
          });
        }
      });
  };

export const getStoreHouseByQuantity =
  (quantityData, page, pageSize) => (dispatch) => {
    const axiosInstance = axios.create({
      baseURL: baseURL,
      auth: {
        username: window.localStorage.getItem("username"),
        password: window.localStorage.getItem("password"),
      },
    });
    var storeHouseParams = new Object();

    storeHouseParams.page = page - 1;

    storeHouseParams.size = pageSize;
    axiosInstance
      .get("/storehouse/quantities/" + quantityData, {
        params: storeHouseParams,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.GET_STORE_HOUSE_BY_QUANTITY,
            payload: response.data,
          });
        }
      });
  };
