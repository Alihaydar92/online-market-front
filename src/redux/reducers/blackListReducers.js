import * as actionTypes from "../actions/actionTypes"
import  initialState from "./initialState"


 export default function categoryReducers(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SHOW_BLACK_LIST: {
            return {
                ...state,
                showBlackListData: action.payload
            }
        }
        
        default:
            return state;
    }
}