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
const store = configureStore();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
   
        {" "}
        <Routes>
          <Route path="/" element={<Login />} exact></Route>
          <Route exact path="/*" element={<App />}></Route>
        </Routes>
      

      {/* <App/> */}
    </BrowserRouter>
  </Provider>,
  rootElement
);
