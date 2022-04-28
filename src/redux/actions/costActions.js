import * as actionTypes from "./actionTypes";
import axios from "axios";
const baseURL = process.env.REACT_APP_BACKEND_URL;
export const listOfCostType = () => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  axiosInstance.get("/expenseTypes").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_COST_TYPES,
      payload: response.data,
    });
  });
};

export const addCostType = (data) => (dispatch) => {
  const axiosInstance = axios.create({
    baseURL: baseURL,
    auth: {
      username: window.localStorage.getItem("username"),
      password: window.localStorage.getItem("password"),
    },
  });
  console.log("add addIncomeType ", data);
  axiosInstance.post("/expenseTypes", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_COST_TYPE,
        payload: response.data,
      });

      dispatch(listOfCostType());
    }
  });
};
