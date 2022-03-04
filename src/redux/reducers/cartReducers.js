import * as actionTypes from "../actions/actionTypes"
import  initialState from "./initialState"
import Cookies from "universal-cookie";
var arr=[]
 export default function cartReducers(state = initialState, action) {
    const cookies = new Cookies();
    console.log(action.payload)
    switch (action.type) {
        case actionTypes.ADD_CART: {
        
            if (Object.entries(action.payload).length > 0) {
                for (let value of Object.values(action.payload.items)) {
                  // setBasketDataState((oldArray) => [...oldArray, value]);
                  arr.push(value);
                }
                var basketArrayString = JSON.stringify(arr);
                cookies.set("basketArray", basketArrayString);
                cookies.set("customerDto",action.payload.customerDto);
                cookies.set("sellerDto",action.payload.sellerDto);
                cookies.set("grandTotal",action.payload.grandTotal);
                cookies.set("allBasketData",action.payload);
              }
              return {
                ...state,
                // basketData: action.payload,
                // basketItems:arr
                // basketGrandTotal:action.payload.grandTotal
            }
        }
        
        default:
            return state;
    }
}