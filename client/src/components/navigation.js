import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

class Navigation extends Component {
  render = () => (
    <Container>
      <Link to="/">Go to Home</Link> <br />
      <Link to="/articleList">Go to Article</Link> <br />
    </Container>
  );
}

export default Navigation;
