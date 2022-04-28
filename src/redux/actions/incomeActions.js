import * as actionTypes from "./actionTypes";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const listOfIncomeType = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/profitTypes").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_INCOME_TYPES,
      payload: response.data,
    });
  });
};

export const addIncomeType = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  console.log("add addIncomeType ", data);
  axiosInstance.post("/profitTypes", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_INCOME_TYPE,
        payload: response.data,
      });

      dispatch(listOfIncomeType());
    }
  });
};
