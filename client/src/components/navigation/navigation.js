import React from "react";
import Cookie from "js-cookie";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

function Navigation() {
  const token = Cookie.get("token");

  return (
    <Container className="navigation">
      {token ? <LoggedInUserNavigation /> : <NotLoggedInUserNavigation />}
      <NavLink
        to="/exploreArticles"
        className="navigation__item"
        activeClassName="navigation__item--active"
      >
        Explore
      </NavLink>{" "}
    </Container>
  );
}

const LoggedInUserNavigation = () => {
  return (
    <>
      <NavLink
        exact
        to="/"
        className="navigation__item"
        activeClassName="navigation__item--active"
      >
        Home
      </NavLink>
      <NavLink
        to="/articleList"
        className="navigation__item"
        activeClassName="navigation__item--active"
      >
        Articles
      </NavLink>
    </>
  );
};

const NotLoggedInUserNavigation = () => {
  return (
    <>
      <NavLink
        to="/register"
        className="navigation__item"
        activeClassName="navigation__item--active"
      >
        Register
      </NavLink>
      <NavLink
        to="/login"
        className="navigation__item"
        activeClassName="navigation__item--active"
      >
        Log in
      </NavLink>
    </>
  );
};

export default Navigation;
