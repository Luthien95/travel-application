import React from "react";
import "./../style/css/style.css";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import places from "./../data/articles.json";
import Article from "./article";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="article-list">
        <Row>
          <Col md={4} sm={6} xs={12}>
            <Link to="/newArticle">
              <div className="article-list__new-window">
                <FontAwesomeIcon icon={faPlus} />
                <p>Add new travel registry</p>
              </div>
            </Link>
          </Col>
          {places.map((place2) => (
            <Col md={4} sm={6} xs={12}>
              <Link to={`/article/${place2.id}`}>
                <ArticleShortcut place={place2} />
              </Link>
            </Col>
          ))}
        </Row>
        <Switch>
          <Route path="/article/:id" component={Article} />
        </Switch>
      </Container>
    );
  }
}

const ArticleShortcut = ({ place }) => {
  return (
    <div className="article-shortcut">
      <img className="article-shortcut__image" src={place.img} />
      <p className="article-shortcut__date">{place.date}</p>
      <h1 className="article-shortcut__header">{place.title}</h1>
    </div>
  );
};

export default ArticleList;
