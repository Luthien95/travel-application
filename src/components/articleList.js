import React from "react";
import "./../style/css/style.css";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import places from "./../data/articles.json";
import Article from "./article";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      place: null,
    };

    this.changeId = this.changeId.bind(this);
  }

  changeId(place2) {
    this.setState(
      {
        place: place2,
      },
      console.log(place2)
    );
  }

  render() {
    console.log(this.state.place);
    return (
      <Container className="article-list">
        <Row>
          <Col md={4} sm={6} xs={12}>
            <Link to="/newArticle">
              <div className="article-list__new-window">
                <p>Add new travel registry</p>
              </div>
            </Link>
          </Col>
          {places.map((place2) => (
            <Col md={4} sm={6} xs={12}>
              <Link
                to={`/article/${place2.id}`}
                onClick={() => this.changeId(place2)}
              >
                <ArticleShortcut place={place2} />
              </Link>
            </Col>
          ))}
        </Row>
        <Switch>
          <Route
            path="/article/:id"
            render={(props) => <Article place={this.state.place} />}
          />
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
