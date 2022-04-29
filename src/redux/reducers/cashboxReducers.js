import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cashboxReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CASHBOX_TYPE_LIST: {
      return {
        ...state,
        cashboxTypeListData: action.payload,
      };
    }
    case actionTypes.CASHBOX_LIST: {
      return {
        ...state,
        cashboxListData: action.payload,
      };
    }
    case actionTypes.CASHBOX_BY_ID: {
      return {
        ...state,
        cashboxByIdData: action.payload,
      };
    }

    default:
      return state;
  }
}
