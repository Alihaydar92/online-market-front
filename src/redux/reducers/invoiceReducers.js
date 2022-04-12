import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function invoiceReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LIST_OF_INVOICES: {
      return {
        ...state,
        invoiceListData: action.payload,
      };
    }

    default:
      return state;
  }
}
