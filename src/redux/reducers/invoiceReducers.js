import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function invoiceReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LIST_OF_INVOICES: {
      console.log(action.payload)
      return {
        ...state,
        invoiceListData: action.payload,
      };
    }
    case actionTypes.GET_INVOICE_BY_ID: {
      return {
        ...state,
        invoiceItemsById: action.payload.items,
        invoiceAllDataById: action.payload,
      };
    }
    case actionTypes.LIST_OF_INVOICE_TYPES: {
      return {
        ...state,
        invoiceTypeListData: action.payload,
      };
    }
    default:
      return state;
  }
}
