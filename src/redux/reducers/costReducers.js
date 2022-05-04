import * as actionTypes from "../actions/actionTypes"
import  initialState from "./initialState"


 export default function costReducers(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LIST_OF_COST_TYPES: {
            return {
                ...state,
                typesListData: action.payload
            }
        }
        
        default:
            return state;
    }
}