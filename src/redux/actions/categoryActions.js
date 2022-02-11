import * as actionTypes from "./actionTypes";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const listOfCategories = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.get("/categories").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_CATEGORIES,
      payload: response.data,
    });
  });
};

export const getCategoryById = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.get("/categories/" + id).then((response) => {
    dispatch({
      type: actionTypes.GET_CATEGORY_BY_ID,
      payload: response.data,
    });
  });
};

export const addCategory = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
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
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
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
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
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
