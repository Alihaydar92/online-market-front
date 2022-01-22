import axios from "axios";
import * as actionTypes from "./actionTypes";

export const listOfCategories = () => (dispatch) => {
  axios.get("http://localhost:8080/categories").then((response) => {
    console.log('LIST_OF_CATEGORIES ',response.data)
    dispatch({
      type: actionTypes.LIST_OF_CATEGORIES,
      payload: response.data,
    });
  });
};