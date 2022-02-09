import * as actionTypes from "./actionTypes";
import axiosInstance from "../../helpers/axios";
export const listOfCustomers = (page, pageSize) => (dispatch) => {
  axiosInstance
    .get("/customers?page=" + (page - 1) + "&size=" + pageSize)
    .then((response) => {
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

export const searchCustomers = (customerData, page,pageSize) => (dispatch) => {
  var customerParams = new Object();
  if (customerData !== "") {
    customerParams.name = customerData;
  }

  customerParams.page = page-1;

  customerParams.size = pageSize;

  axiosInstance
    .get("/customers" 
    // +"?name=Huseyn&page=1&size=15"
    , { params: customerParams }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        dispatch({
          type: actionTypes.SEARCH_CUSTOMER,
          payload: response.data,
        });

        // dispatch(listOfCustomers());
      }
    });
};
