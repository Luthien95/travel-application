import React from "react";
import { Route, Switch } from "react-router-dom";
import ArticleComponent from "./article";
import ArticleList from "./articleList";
import NewArticle from "./newArticle";
import Homepage from "./homepage";
import Login from "./authorization/login";
import Register from "./authorization/register";
import ExploreArticles from "./exploreArticles";

const App = () => <Homepage />;
const Article = () => <ArticleComponent />;

const routes = (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/articleList" component={ArticleList} />
    <Route path="/article/:id" component={Article} />
    <Route path="/newArticle" component={NewArticle} />
    <Route path="/exploreArticles" component={ExploreArticles} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
  </Switch>
);

export default routes;
