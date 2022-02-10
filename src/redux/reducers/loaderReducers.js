import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes";

export default function loaderReducers(state = initialState, action) {
  switch (action.type) {
   
    case actionTypes.SHOW_LOADER:{
      return{
        ...state,
        loading:action.payload
      }
    }
    case actionTypes.HIDE_LOADER:{
      return{
        ...state,
        loading:action.payload
      }
    }
    default:
      return state;
  }
}
