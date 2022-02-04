import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes, Link } from "react-router-dom";
import App from "./components/App";
import Login from "./components/Login";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import configureStore from "./redux/reducers/configureStore";
import { Provider } from "react-redux";
import {BrowserRouter} from "react-router-dom"
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>  
    <App /> 
    {/* <Login/> */}
    </BrowserRouter>
    
  </Provider>,
  document.getElementById("root")
);
