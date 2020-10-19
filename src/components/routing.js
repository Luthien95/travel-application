import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ArticleComponent from "./article";
import ArticleList from "./articleList";
import NewArticle from "./newArticle";

const App = () => <h1>Home</h1>;
const Article = () => <ArticleComponent />;

const routes = (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/article" component={ArticleList} />
    <Route path="/article/:1" component={Article} />
    <Route path="/newArticle" component={NewArticle} />
  </Switch>
);

export default routes;
