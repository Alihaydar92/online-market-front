import {combineReducers} from "redux"
import customerReducer from "./customerReducer";
import expeditorReducers from "./expeditorReducers";
import productReducers from "./productReducers";
import categoryReducers from "./categoryReducers";
import propertyReducers from "./propertyReducers";
import storeHouseReducers from "./storeHouseReducers"
const rootReducer=combineReducers({
    customerReducer,
    expeditorReducers,
    productReducers,
    categoryReducers,
    propertyReducers,
    storeHouseReducers
})

export default rootReducer;