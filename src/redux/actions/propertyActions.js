import axios from "axios";
import * as actionTypes from "./actionTypes";

export const listOfProperties = () => (dispatch) => {
  axios.get("http://localhost:8080/properties").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_PROPERTIES,
      payload: response.data,
    });
  });
};

export const addProperty = (data) => (dispatch) => {
  axios.post("http://localhost:8080/properties",data).then((response) => {
    dispatch({
      type: actionTypes.ADD_PROPERTY,
      payload: response.data,
    });
  });
};

export const getPropertyById = (id) => (dispatch) => {
  axios.get("http://localhost:8080/properties/"+id).then((response) => {
    dispatch({
      type: actionTypes.GET_PROPERTY_BY_ID,
      payload: response.data,
    });
  });
};

export const updateProperty = (data) => (dispatch) => {
  axios.put("http://localhost:8080/properties/"+data.id,data).then((response) => {
    dispatch({
      type: actionTypes.UPDATE_PROPERTY,
      payload: response.data,
    });
  });
};

export const deleteProperty = (id) => (dispatch) => {
  axios.delete("http://localhost:8080/properties/"+id).then((response) => {
    dispatch({
      type: actionTypes.DELETE_PROPERTY,
      payload: response.data,
    });
  });
};