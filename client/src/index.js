import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/css/style.css";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Navigation from "./components/navigation/navigation";
import routing from "./components/navigation/routing";
import Header from "./components/header";
import axios from "axios";
import Cookie from "js-cookie";

const token = Cookie.get("token");
axios.defaults.headers.common["Authorization"] = token;

const route = (
  <React.Fragment>
    <Router>
      <Header />
      <Navigation />
      {routing}
    </Router>
  </React.Fragment>
);

ReactDOM.render(route, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
