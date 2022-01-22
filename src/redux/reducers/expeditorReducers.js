import * as actionTypes from "../actions/actionTypes"
import  initialState from "./initialState"


 export default function expeditorReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LIST_OF_EXPEDITORS: {
            return {
                ...state,
                expeditorListData: action.payload
            }
        }
        case actionTypes.ADD_EXPEDITOR: {
            return {
                ...state,
                expeditorAddData: action.payload
            }
        }
        case actionTypes.UPDATE_EXPEDITOR: {
            return {
                ...state,
                expeditorUpdateData: action.payload
            }
        }
        case actionTypes.GET_EXPEDITOR_BY_ID: {
            return {
                ...state,
                expeditorDataById: action.payload
                
            }
        }
        default:
            return state;
    }
}