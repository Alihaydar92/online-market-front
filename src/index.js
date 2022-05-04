import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import App from "./components/Base/App";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import configureStore from "./redux/reducers/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/Base/App";
import Login from "./components/Base/Login";
import { CookiesProvider } from "react-cookie";

import Sale from "../src/components/Cart/Sale";
import SaleBasket from "../src/components/Cart/SaleBasket";
import RestoreBasket from "../src/components/Cart/RestoreBasket";
import RetailBasket from "../src/components/Cart/RetailBasket";
import Invoice from "../src/components/Invoice/Invoice";
import Restore from "../src/components/Cart/Restore";
import Retail from "../src/components/Cart/Retail";
import CashBoxPage from "../src/components/CashBox/CashBoxPage";
import IncomePage from "../src/components/Income/IncomePage";
import CostPage from "../src/components/Cost/CostPage";
import CustomerTable from "../src/components/Customer/CustomerTable";
import ExpeditorTable from "../src/components/Expeditor/ExpeditorTable";
import ProductTable from "../src/components/Product/ProductTable";
import CategoryTable from "../src/components/Category/CategoryTable";
import PropertyTable from "../src/components/Property/PropertyTable";
import StoreHouseTable from "../src/components/StoreHouse/StoreHouseTable";
import Numerate from "../src/components/Numerate/Numerate";
import NumerateResult from "../src/components/Numerate/NumerateResult";
import CustomerBlakcList from "../src/components/BlackList/CustomerBlakcList";
const store = configureStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} exact></Route>
        <Route
          exact
          path="/*"
          element={
            <CookiesProvider>
              <App />
            </CookiesProvider>
          }
        >
          {/* <Route path="customers" element={<CustomerTable />} />
          <Route path="sellers" element={<ExpeditorTable />} />
          <Route path="products" element={<ProductTable />} />
          <Route path="categories" element={<CategoryTable />} />
          <Route path="properties" element={<PropertyTable />} />
          <Route path="storeHouse" element={<StoreHouseTable />} />
          <Route path="sale" element={<Sale />} />
          <Route path="restore" element={<Restore />} />
          <Route path="retail" element={<Retail />} />

          <Route path="saleBasket" element={<SaleBasket />} />
          <Route path="restoreBasket" element={<RestoreBasket />} />
          <Route path="retailBasket" element={<RetailBasket />} />
          <Route path="numerate" element={<Numerate />} />
          <Route path="numerateResult" element={<NumerateResult />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="cashbox" element={<CashBoxPage />} />
          <Route path="income" element={<IncomePage />} />
          <Route path="cost" element={<CostPage />} />

          <Route path="customerBlackList" element={<CustomerBlakcList />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  rootElement
);
