import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import expeditorReducers from "./expeditorReducers";
import productReducers from "./productReducers";
import categoryReducers from "./categoryReducers";
import propertyReducers from "./propertyReducers";
import storeHouseReducers from "./storeHouseReducers";
import loaderReducers from "./loaderReducers";
import authReducers from "./authReducers";
import saleReducers from "./saleReducers";
import blackListReducers from "./blackListReducers";
import invoiceReducers from "./invoiceReducers";
import restoreReducers from "./restoreReducers";
import retailReducers from "./retailReducers";
const rootReducer = combineReducers({
  customerReducer,
  expeditorReducers,
  productReducers,
  categoryReducers,
  propertyReducers,
  storeHouseReducers,
  loaderReducers,
  authReducers,
  blackListReducers,
  invoiceReducers,
  saleReducers,
  restoreReducers,
  retailReducers,
});

export default rootReducer;
