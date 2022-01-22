import * as actionTypes from "../actions/actionTypes"
import  initialState from "./initialState"


 export default function propertyReducers(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LIST_OF_PROPERTIES: {
            return {
                ...state,
                propertyListData: action.payload
            }
        }
        // case actionTypes.ADD_CATEGORY: {
        //     return {
        //         ...state,
        //         categoryAddData: action.payload
        //     }
        // }
        // case actionTypes.UPDATE_CATEGORY: {
        //     return {
        //         ...state,
        //         categoryUpdateData: action.payload
        //     }
        // }
        // case actionTypes.GET_CATEGORY_BY_ID: {
        //     return {
        //         ...state,
        //         categoryDataById: action.payload
                
        //     }
        // }
        default:
            return state;
    }
}