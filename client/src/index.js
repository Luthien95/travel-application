import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/css/style.css";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Navigation from "./components/navigation";
import routing from "./components/routing";
import App from "./App";

const route = (
  <React.Fragment>
    <Router>
      <Navigation />
      {routing}
    </Router>
    <App />
  </React.Fragment>
);

ReactDOM.render(route, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
