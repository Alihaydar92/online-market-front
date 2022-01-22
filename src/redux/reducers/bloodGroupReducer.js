import * as actionTypes from "../actions/actionTypes"

const initialState = {
    data:{}
 }


 export default function exampleReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LIST_OF_BLOOD_GROUP: {
            return {
                ...state,
                data: action.payload
            }
        }
        default:
            return state;
    }
}