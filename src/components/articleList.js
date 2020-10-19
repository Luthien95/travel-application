import React from "react";
import "./../style/css/style.css";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import places from "./../data/articles.json";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    //this.loadOptions = this.loadOptions.bind(this);
  }

  render() {
    return (
      <Container className="article-list">
        <Row>
          <Col md={4}>
            <Link to="/newArticle">
              <div className="article-list__new-window">
                <p>Add new travel registry</p>
              </div>
            </Link>
          </Col>
          {places.map((place2) => (
            <Col md={4}>
              <ArticleShortcut place={place2} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

const ArticleShortcut = ({ place }) => {
  return (
    <div className="article-shortcut">
      <img className="article-shortcut__image" src={place.img} />
      <p className="article-shortcut__date">{place.date}</p>
      <a>
        <h1 className="article-shortcut__header">{place.title}</h1>
      </a>
    </div>
  );
};

export default ArticleList;
