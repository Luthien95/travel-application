import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";

class Navigation extends React.Component {
  render = () => {
    return (
      <Container className="navigation">
        <NavLink
          exact
          to="/"
          className="navigation__item"
          activeClassName="navigation__item--active"
        >
          Home
        </NavLink>{" "}
        <NavLink
          to="/articleList"
          className="navigation__item"
          activeClassName="navigation__item--active"
        >
          Articles
        </NavLink>{" "}
        <NavLink
          exact
          to="/"
          className="navigation__item"
          activeClassName="navigation__item--active"
        >
          Explore
        </NavLink>{" "}
        <NavLink
          to="/register"
          className="navigation__item"
          activeClassName="navigation__item--active"
        >
          Register
        </NavLink>{" "}
      </Container>
    );
  };
}

export default Navigation;
