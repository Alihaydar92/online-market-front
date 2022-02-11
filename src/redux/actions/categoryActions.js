import * as actionTypes from "./actionTypes";
import axiosInstance from "../../helpers/axios";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;
const axiosInstance1 = axios.create({
  baseURL: baseURL,
  auth: {
    username: window.localStorage.getItem("username"),
    password: window.localStorage.getItem("password"),
  },
  
}
);
export const listOfCategories = () => (dispatch) => {
  
  axiosInstance1.get("/categories").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_CATEGORIES,
      payload: response.data,
    });
  });
};

export const getCategoryById = (id) => (dispatch) => {
  axiosInstance.get("/categories/" + id).then((response) => {
    dispatch({
      type: actionTypes.GET_CATEGORY_BY_ID,
      payload: response.data,
    });
  });
};

export const addCategory = (data) => (dispatch) => {
  axiosInstance.post("/categories", data).then((response) => {
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
  axiosInstance.put("/categories/" + data.id, data).then((response) => {
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
  axiosInstance.delete("/categories/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_CATEGORY,
        payload: response.data,
      });
      dispatch(listOfCategories());
    }
  });
};
