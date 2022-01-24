import axios from "axios";
import * as actionTypes from "./actionTypes";

export const listOfCategories = () => (dispatch) => {
  axios.get("http://localhost:8080/categories").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_CATEGORIES,
      payload: response.data,
    });
  });
};

export const getCategoryById = (id) => (dispatch) => {
  axios.get("http://localhost:8080/categories/" + id).then((response) => {
    dispatch({
      type: actionTypes.GET_CATEGORY_BY_ID,
      payload: response.data,
    });
  });
};

export const addCategory = (data) => (dispatch) => {
  axios.post("http://localhost:8080/categories", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_CATEGORY,
        payload: response.data,
      });
      dispatch(listOfCategories());
    }
  });
};
export const updateCategory = (data) => (dispatch) => {
  axios
    .put("http://localhost:8080/categories/" + data.id, data)
    .then((response) => {
      if (response.status === 200) {
        dispatch({
          type: actionTypes.UPDATE_CATEGORY,
          payload: response.data,
        });
        dispatch(listOfCategories());
      }
    });
};
export const deleteCategory = (id) => (dispatch) => {
  axios.delete("http://localhost:8080/categories/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_CATEGORY,
        payload: response.data,
      });
      dispatch(listOfCategories());
    }
  });
};
