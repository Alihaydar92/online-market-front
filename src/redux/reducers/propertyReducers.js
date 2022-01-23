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
        case actionTypes.ADD_PROPERTY: {
            return {
                ...state,
                propertyAddData: action.payload
            }
        }
        case actionTypes.UPDATE_PROPERTY: {
            return {
                ...state,
                propertyUpdateData: action.payload
            }
        }
        case actionTypes.GET_PROPERTY_BY_ID: {
            return {
                ...state,
                propertyDataById: action.payload
                
            }
        }

        case actionTypes.DELETE_PROPERTY: {
            return {
                ...state,
                propertyDeleteData: action.payload
                
            }
        }
        default:
            return state;
    }
}