import axios from "axios"
import * as actionTypes from "./actionTypes"


export const listOfCustomers = () => (dispatch) => {
    axios.get("http://localhost:8080/customers")
    .then(response => {
        console.log(response.data);
        console.log(response);
      dispatch({
        type: actionTypes.LIST_OF_CUSTOMERS,
        payload: response.data

        
      })
    })
  }

  export const addCustomer = (data) => (dispatch) => {
    console.log('add customer ' ,data);
    axios.post("http://localhost:8080/customers",data)
    .then(response => {
        console.log(response.data);
        console.log(response);
      dispatch({
        type: actionTypes.ADD_CUSTOMER,
        payload: response.data

        
      })
    })
  }

  export const updateCustomer = (data) => (dispatch) => {
    console.log('update customer ' ,data);
    axios.put("http://localhost:8080/customers/" +data.id,data)
    .then(response => {
        console.log(response.data);
        console.log(response);
      dispatch({
        type: actionTypes.UPDATE_CUSTOMER,
        payload: response.data       
      })
    })
  }

  export const deleteCustomer = (id) => (dispatch) => {
    axios.delete("http://localhost:8080/customers/"+id)
    .then(response => {
        console.log(response.data);
        console.log(response);
      dispatch({
        type: actionTypes.DELETE_CUSTOMER,
        payload: response.data

        
      })
    })
  }

  export const getCustomerById = (id) => (dispatch) => {
    axios.get("http://localhost:8080/customers/"+id)
    .then(response => {
        console.log(response.data);
        console.log(response);
      dispatch({
        type: actionTypes.GET_CUSTOMER_BY_ID,
        payload: response.data

        
      })
    })
  }