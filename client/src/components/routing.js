import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticleComponent from "./article";
import ArticleList from "./articleList";
import NewArticle from "./newArticle";
import Homepage from "./homepage";
import Login from "./login";
import Register from "./register";

const App = () => <Homepage />;
const Article = () => <ArticleComponent />;

const routes = (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/articleList" component={ArticleList} />
    <Route path="/article/:id" component={Article} />
    <Route path="/newArticle" component={NewArticle} />
    <Route path="/register" component={Register} />
  </Switch>
);

export default routes;
