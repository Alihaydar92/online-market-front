import {combineReducers} from "redux"
import bloodGroupReducer from "./bloodGroupReducer";
import customerReducer from "./customerReducer";
import expeditorReducers from "./expeditorReducers";
import productReducers from "./productReducers";
import categoryReducers from "./categoryReducers";
const rootReducer=combineReducers({
    bloodGroupReducer,
    customerReducer,
    expeditorReducers,
    productReducers,
    categoryReducers
})

export default rootReducer;