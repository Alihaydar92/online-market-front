import * as actionTypes from "../actions/actionTypes"
import  initialState from "./initialState"


 export default function cartReducers(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_CART: {
            return {
                ...state,
                basketData: action.payload
            }
        }
        
        default:
            return state;
    }
}