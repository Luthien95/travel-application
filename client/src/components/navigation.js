import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

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
      </Container>
    );
  };
}

export default Navigation;
