import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes";

export default function productReducers(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LIST_OF_PRODUCTS: {
      return {
        ...state,
        productListData: action.payload,
      };
    }

    case actionTypes.GET_PRODUCT_BY_ID: {
      return {
        ...state,
        productDataById: action.payload,
      };
    }

    case actionTypes.DELETE_PRODUCT: {
      return {
        ...state,
        productDeleteData: action.payload,
      };
    }
    case actionTypes.ADD_PRODUCT: {
      return {
        ...state,
        productAddData: action.payload,
      };
    }
    default:
      return state;
  }
}
