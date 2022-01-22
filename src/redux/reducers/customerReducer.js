import * as actionTypes from "../actions/actionTypes"
import  initialState from "./initialState"


 export default function customerReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LIST_OF_CUSTOMERS: {
            return {
                ...state,
                customerListData: action.payload
            }
        }
        case actionTypes.ADD_CUSTOMER: {
            return {
                ...state,
                customerAddData: action.payload
            }
        }
        case actionTypes.UPDATE_CUSTOMER: {
            return {
                ...state,
                customerUpdateData: action.payload
            }
        }
        case actionTypes.GET_CUSTOMER_BY_ID: {
            return {
                ...state,
                customerDataById: action.payload
                
            }
        }
        default:
            return state;
    }
}