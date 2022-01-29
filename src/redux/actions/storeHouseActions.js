import * as actionTypes from "./actionTypes";
import axiosInstance from "../../helpers/axios";
export const listOfStoreHouse = () => (dispatch) => {
  axiosInstance.get("/storehouse").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_STOREHOUSE,
      payload: response.data,
    });
  });
};
export const getStoreHouseById = (id) => (dispatch) => {
  axiosInstance.get("/storehouse/" + id).then((response) => {
    console.log("response ", response.data);
    dispatch({
      type: actionTypes.GET_STOREHOUSE_BY_ID,
      payload: response.data,
    });
  });
};

export const addStoreHouse = (data) => (dispatch) => {
  axiosInstance.post("/storehouse", data).then((response) => {
    console.log('add store house ',response.status)
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