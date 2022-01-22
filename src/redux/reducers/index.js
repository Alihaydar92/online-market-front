import {combineReducers} from "redux"
import bloodGroupReducer from "./bloodGroupReducer";
import customerReducer from "./customerReducer";
import expeditorReducers from "./expeditorReducers";
const rootReducer=combineReducers({
    bloodGroupReducer,
    customerReducer,
    expeditorReducers
})

export default rootReducer;