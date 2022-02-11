import * as actionTypes from "./actionTypes";
import axios from "axios";

import { showLoader, hideLoader } from "../actions/loaderActions";
import {notification} from "antd"
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const listOfExpeditors = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.get("/sellers").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_EXPEDITORS,
      payload: response.data,
    });
  });
};
export const getExpeditorById = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.get("/sellers/" + id).then((response) => {
    dispatch({
      type: actionTypes.GET_EXPEDITOR_BY_ID,
      payload: response.data,
    });
  });
};

export const addExpeditor = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  console.log("add customer ", data);
  axiosInstance.post("/sellers", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_EXPEDITOR,
        payload: response.data,
      });

      dispatch(listOfExpeditors());
    }
  });
};

export const updateExpeditor = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.put("/sellers/" + data.id, data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_EXPEDITOR,
        payload: response.data,
      });
      dispatch(listOfExpeditors());
    }
  });
};

export const deleteExpeditor = (id) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  axiosInstance.delete("/sellers/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_EXPEDITOR,
        payload: response.data,
      });
      dispatch(listOfExpeditors());
    }
  });
};

export const addExpeditorExcel = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
    
  }
  );
  dispatch(showLoader());
  axiosInstance.post("/sellers/excel", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_EXPEDITOR_EXCEL,
        payload: response.data,
      });
      dispatch(hideLoader());
      notification['success']({message:response.data,description:''})
      dispatch(listOfExpeditors());
    }
  });
};
