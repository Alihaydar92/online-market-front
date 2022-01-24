import axios from "axios";
import * as actionTypes from "./actionTypes";

export const listOfProducts = () => (dispatch) => {
  axios.get("http://localhost:8080/products").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_PRODUCTS,
      payload: response.data,
    });
  });
};

export const getProductById = (id) => (dispatch) => {
  axios.get("http://localhost:8080/products/" + id).then((response) => {
    console.log("response ", response.data);
    dispatch({
      type: actionTypes.GET_PRODUCT_BY_ID,
      payload: response.data,
    });
  });
};

export const addProduct = (data) => (dispatch) => {
  axios.post("http://localhost:8080/products", data).then((response) => {
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
  axios
    .put("http://localhost:8080/products/" + data.id, data)
    .then((response) => {
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
  axios.delete("http://localhost:8080/products/" + id).then((response) => {
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
  console.log('excell data ',data)
  axios.add("http://localhost:8080/products/excel",data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PRODUCT_EXCEL,
        payload: response.data,
      });
      dispatch(listOfProducts());
    }
  });
};
