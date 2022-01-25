import * as actionTypes from "./actionTypes";
import axiosInstance from "../../helpers/axios";
export const listOfProducts = () => (dispatch) => {
  axiosInstance.get("/products").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_PRODUCTS,
      payload: response.data,
    });
  });
};

export const getProductById = (id) => (dispatch) => {
  axiosInstance.get("/products/" + id).then((response) => {
    console.log("response ", response.data);
    dispatch({
      type: actionTypes.GET_PRODUCT_BY_ID,
      payload: response.data,
    });
  });
};

export const addProduct = (data) => (dispatch) => {
  axiosInstance.post("/products", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PRODUCT,
        payload: response.data,
      });
      dispatch(listOfProducts());
    }
  });
};

export const updateProduct = (data) => (dispatch) => {
  console.log("update product data ", data);
  axiosInstance.put("/products/" + data.id, data).then((response) => {
    console.log(response.status);
    console.log(response.data);
    if (response.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_PRODUCT,
        payload: response.data,
      });
      dispatch(listOfProducts());
    }
  });
};
export const deleteProduct = (id) => (dispatch) => {
  axiosInstance.delete("/products/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_PRODUCT,
        payload: response.data,
      });
      dispatch(listOfProducts());
    }
  });
};

export const addProductExcel = (data) => (dispatch) => {
  console.log("excell data ", data);
  axiosInstance.add("/products/excel", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PRODUCT_EXCEL,
        payload: response.data,
      });
      dispatch(listOfProducts());
    }
  });
};

export const addProductImages = (id, data) => (dispatch) => {
  axiosInstance.add("/products/" + id + "/images", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PRODUCT_IMAGES,
        payload: response.data,
      });
      dispatch(listOfProducts());
    }
  });
};
