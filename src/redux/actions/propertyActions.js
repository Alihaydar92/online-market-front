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