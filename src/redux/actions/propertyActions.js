import * as actionTypes from "./actionTypes";
import axiosInstance from "../../helpers/axios";
export const listOfProperties = () => (dispatch) => {
  axiosInstance.get("/properties",{
  }).then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_PROPERTIES,
      payload: response.data,
    });
  });
};

export const addProperty = (data) => (dispatch) => {
  axiosInstance.post("/properties", data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.ADD_PROPERTY,
        payload: response.data,
      });
      dispatch(listOfProperties());
    }
  });
};

export const getPropertyById = (id) => (dispatch) => {
  axiosInstance.get("/properties/" + id).then((response) => {
    dispatch({
      type: actionTypes.GET_PROPERTY_BY_ID,
      payload: response.data,
    });
  });
};

export const updateProperty = (data) => (dispatch) => {
  axiosInstance.put("/properties/" + data.id, data).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.UPDATE_PROPERTY,
        payload: response.data,
      });
      dispatch(listOfProperties());
    }
  });
};

export const deleteProperty = (id) => (dispatch) => {
  axiosInstance.delete("/properties/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_PROPERTY,
        payload: response.data,
      });
      dispatch(listOfProperties());
    }
  });
};
