import {combineReducers} from "redux"
import bloodGroupReducer from "./bloodGroupReducer";
import customerReducer from "./customerReducer";
import expeditorReducers from "./expeditorReducers";
import productReducers from "./productReducers";
const rootReducer=combineReducers({
    bloodGroupReducer,
    customerReducer,
    expeditorReducers,
    productReducers
})

export default rootReducer;