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
    console.log('response ',response.data);
    dispatch({
      type: actionTypes.GET_PRODUCT_BY_ID,
      payload: response.data,
    });
  });
};
export const deleteProduct = (id) => (dispatch) => {
  axios.delete("http://localhost:8080/products/" + id).then((response) => {
    dispatch({
      type: actionTypes.DELETE_PRODUCT,
      payload: response.data
    });
  });
};
