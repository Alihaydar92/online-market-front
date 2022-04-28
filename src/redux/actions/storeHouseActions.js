import * as actionTypes from "./actionTypes";
import axios from "axios";
import { showLoader, hideLoader } from "../actions/loaderActions";
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
  dispatch(showLoader());
    
  axiosInstance.get("/storehouse/" + id).then((response) => {
    console.log("response ", response.data);
    dispatch({
      type: actionTypes.GET_STOREHOUSE_BY_ID,
      payload: response.data,
    });
    dispatch(hideLoader());
  });
};

export const addStoreHouse = (data, page, pageSize) => (dispatch) => {
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
      dispatch(listOfStoreHouse(page, pageSize));
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

export const deleteStoreHouse = (id, page, pageSize) => (dispatch) => {
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
      dispatch(listOfStoreHouse(page, pageSize));
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

export const storeHouseNumerate = (data, count) => (dispatch) => {
  var storeHouseData = new Object();
  storeHouseData.quantity = count;
  storeHouseData.storeHouseId = data.storeHouseId;
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  console.log(storeHouseData);
  axiosInstance.post("/storehouse/count", storeHouseData).then((response) => {
    console.log(" store house count status ", response.status);
    if (response.status === 200) {
      dispatch({
        type: actionTypes.STOREHOUSE_NUMERATE,
        payload: response.data,
      });
    }
  });
};

export const storeHouseCountCombo = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/storehouse/count/combo").then((response) => {
    dispatch({
      type: actionTypes.STOREHOUSE_COUNT_COMBO,
      payload: response.data,
    });
  });
};

export const storeHouseNumerateResult = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/storehouse/count").then((response) => {
    dispatch({
      type: actionTypes.STOREHOUSE_NUMERATE_RESULT,
      payload: response.data,
    });
  });
};
