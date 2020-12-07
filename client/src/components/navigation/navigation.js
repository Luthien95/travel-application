import React from "react";
import Cookie from "js-cookie";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Navigation() {
  let history = useHistory();
  const token = Cookie.get("token");

  const removeCookie = () => {
    Cookie.remove("token", { path: "" });
    // console.log(Cookie.get("token"));
    history.push("/login");
  };

  // console.log(Cookie.get("token"));

  return (
    <Container className="navigation">
      {token ? (
        <LoggedInUserNavigation removeCookie={removeCookie} />
      ) : (
        <NotLoggedInUserNavigation />
      )}
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

const LoggedInUserNavigation = ({ removeCookie }) => {
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
      <a className="navigation__item" onClick={removeCookie}>
        Logout
      </a>
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
