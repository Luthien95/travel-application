import React from "react";
import "./../style/css/style.css";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Article from "./article";
import Loader from "./loader";
import axios from "axios";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleList: null,
    };
  }

  componentDidMount = () => {
    axios.get("/api/articles").then((response) => {
      this.setState({
        articleList: response.data,
      });
    });
  };

  render() {
    const { articleList } = this.state;

    return (
      <Container className="article-list">
        <Row>
          <Col md={4} sm={6} xs={12} className="p-0">
            <Link to="/newArticle">
              <div className="article-list__new-window">
                <FontAwesomeIcon icon={faPlus} />
                <p>Add new travel registry</p>
              </div>
            </Link>
          </Col>
          {articleList ? (
            articleList.map((place2, id) => (
              <Col md={4} sm={6} xs={12} className="p-0" key={id}>
                <Link to={`/article/${place2._id}`}>
                  <ArticleShortcut place={place2} />
                </Link>
              </Col>
            ))
          ) : (
            <Loader />
          )}
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
      <div className="article-shortcut__data">
        <p className="article-shortcut__city">{place.city}</p>
        <h1 className="article-shortcut__header">{place.title}</h1>
        <p className="article-shortcut__date">{place.date}</p>
        <p className="article-shortcut__description">
          {place.description.substring(0, 130) + "..."}
        </p>
      </div>
    </div>
  );
};

export default ArticleList;
