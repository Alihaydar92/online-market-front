import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function incomeReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LIST_OF_INCOME_TYPES: {
      return {
        ...state,
        incomeTypesListData: action.payload,
      };
    }

    default:
      return state;
  }
}
