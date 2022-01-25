import * as actionTypes from "./actionTypes";
import axiosInstance from "../../helpers/axios";
export const listOfCustomers = () => (dispatch) => {
  axiosInstance.get("/customers").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_CUSTOMERS,
      payload: response.data,
    });
  });
};
export const getCustomerById = (id) => (dispatch) => {
  axiosInstance.get("/customers/" + id).then((response) => {
    dispatch({
      type: actionTypes.GET_CUSTOMER_BY_ID,
      payload: response.data,
    });
  });
};
export const addCustomer = (data) => (dispatch) => {
  axiosInstance.post("/customers", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_CUSTOMER,
        payload: response.data,
      });

      dispatch(listOfCustomers());
    }
  });
};

export const updateCustomer = (data) => (dispatch) => {
  axiosInstance.put("/customers/" + data.id, data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_CUSTOMER,
        payload: response.data,
      });

      dispatch(listOfCustomers());
    }
  });
};

export const deleteCustomer = (id) => (dispatch) => {
  axiosInstance.delete("/customers/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_CUSTOMER,
        payload: response.data,
      });

      dispatch(listOfCustomers());
    }
  });
};
