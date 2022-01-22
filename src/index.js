import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import configureStore from "./redux/reducers/configureStore";
import { Provider } from "react-redux";
import "./index.css";
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
