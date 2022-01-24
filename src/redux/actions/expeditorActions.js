import axios from "axios";
import * as actionTypes from "./actionTypes";

export const listOfExpeditors = () => (dispatch) => {
  axios.get("http://localhost:8080/sellers").then((response) => {
    dispatch({
      type: actionTypes.LIST_OF_EXPEDITORS,
      payload: response.data,
    });
  });
};
export const getExpeditorById = (id) => (dispatch) => {
  axios.get("http://localhost:8080/sellers/" + id).then((response) => {
    dispatch({
      type: actionTypes.GET_EXPEDITOR_BY_ID,
      payload: response.data,
    });
  });
};

export const addExpeditor = (data) => (dispatch) => {
  console.log("add customer ", data);
  axios.post("http://localhost:8080/sellers", data).then((response) => {
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
  axios
    .put("http://localhost:8080/sellers/" + data.id, data)
    .then((response) => {
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
  axios.delete("http://localhost:8080/sellers/" + id).then((response) => {
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETE_EXPEDITOR,
        payload: response.data,
      });
      dispatch(listOfExpeditors());
    }
  });
};
