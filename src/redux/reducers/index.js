import {combineReducers} from "redux"
import customerReducer from "./customerReducer";
import expeditorReducers from "./expeditorReducers";
import productReducers from "./productReducers";
import categoryReducers from "./categoryReducers";
import propertyReducers from "./propertyReducers";
import storeHouseReducers from "./storeHouseReducers"
import paginationReducer from "./paginationReducer"
const rootReducer=combineReducers({
    customerReducer,
    expeditorReducers,
    productReducers,
    categoryReducers,
    propertyReducers,
    storeHouseReducers,
    paginationReducer
})

export default rootReducer;