import * as actionTypes from "../actions/actionTypes"
import  initialState from "./initialState"


 export default function categoryReducers(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LIST_OF_CATEGORIES: {
            return {
                ...state,
                categoryListData: action.payload
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