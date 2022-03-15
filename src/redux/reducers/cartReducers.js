import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducers(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case actionTypes.SHOW_BASKET_ITEMS: {

      if (Object.entries(action.payload).length > 0) {
        var arr = [];
        for (let value of Object.values(action.payload.items)) {
          // setBasketDataState((oldArray) => [...oldArray, value]);
         
          arr.push(value);
        }
      }
      return {
        ...state,
        addBasketItems: arr,
        basketAllData: action.payload,
      };
    }

    default:
      return state;
  }
}
