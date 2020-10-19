import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

class NewArticle extends Component {
  render() {
    return (
      <Container>
        <div className="new-article">
          <div className="new-article__shortcut-image">
            <p>Place main image here</p>
          </div>
          <input placeholder="Type destination name..." />
          <input placeholder="Type destination time..." />
        </div>
      </Container>
    );
  }
}

export default NewArticle;
