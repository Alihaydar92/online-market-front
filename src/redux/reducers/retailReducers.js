import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function retailReducers(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case actionTypes.SHOW_RETAIL_BASKET_ITEMS: {
      if (Object.entries(action.payload).length > 0) {
        var arr = [];
        for (let value of Object.values(action.payload.items)) {
          arr.push(value);
        }
      }
      return {
        ...state,
        addRetailBasketItems: arr,
        retailBasketAllData: action.payload,
      };
    }
    case actionTypes.END_RETAIL: {
      return {
        endRetailReturnData: action.payload,
      };
    }

    default:
      return state;
  }
}
