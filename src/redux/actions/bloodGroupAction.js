import axios from "axios"
import * as actionTypes from "./actionTypes"


export const listOfBloodGroup = () => (dispatch) => {
    axios.get("http://localhost:8080/dict/listOfBloodGroups")
    .then(response => {
      dispatch({
        type: actionTypes.LIST_OF_BLOOD_GROUP,
        payload: response
      })
    })
  }