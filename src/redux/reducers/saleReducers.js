import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function saleReducers(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case actionTypes.SHOW_CART_BASKET_ITEMS: {
      if (Object.entries(action.payload).length > 0) {
        var arr = [];
        for (let value of Object.values(action.payload.items)) {
          arr.push(value);
        }
      }
      return {
        ...state,
        addSaleBasketItems: arr,
        saleBasketAllData: action.payload,
      };
    }
    case actionTypes.END_SALE: {
      return {
        endSaleReturnData: action.payload,
      };
    }

    default:
      return state;
  }
}
