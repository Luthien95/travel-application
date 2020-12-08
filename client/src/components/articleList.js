import React from "react";
import "./../style/css/style.css";
import { Container } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Article from "./article";
import Loader from "./loader";
import ArticleShortcut from "./articleShortcut";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";
import Cookie from "js-cookie";

var jwt = require("jsonwebtoken");

class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleList: null,
      visibleItems: 5,
    };

    this.loadMoreItems = this.loadMoreItems.bind(this);
  }

  componentDidMount = () => {
    const token = Cookie.get("token");
    const decode = jwt.decode(token);
    const userId = decode._id;

    axios
      .get("/api/articles", {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        this.setState({
          articleList: response.data,
        });
      });
  };

  loadMoreItems() {
    this.setState((prev) => {
      return { visibleItems: prev.visibleItems + 6 };
    });
  }

  render() {
    const { articleList, visibleItems } = this.state;

    if (articleList) {
      return (
        <>
          <Container className="article-list">
            {articleList ? (
              <List
                articleList={articleList}
                visibleItems={visibleItems}
                loadMoreItems={this.loadMoreItems}
              />
            ) : (
              <Loader />
            )}
            <Switch>
              <Route path="/article/:id" component={Article} />
            </Switch>
          </Container>
          {visibleItems < articleList.length && (
            <button
              onClick={this.loadMoreItems}
              type="button"
              className="load-more"
            >
              Load more
            </button>
          )}
        </>
      );
    } else {
      return <Loader />;
    }
  }
}

const List = ({ articleList, visibleItems }) => {
  let min = 450;
  let max = 600;

  let articleHeight = min + Math.random() * (max - min) + "px";

  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 650: 3, 900: 3 }}>
      <Masonry>
        <div className="article-list__item" style={{ height: articleHeight }}>
          <Link to="/newArticle">
            <div className="article-list__new-window">
              <FontAwesomeIcon icon={faPlus} />
              <p>Add new travel registry</p>
            </div>
          </Link>
        </div>
        {articleList.slice(0, visibleItems).map((place2, id) => {
          articleHeight = min + Math.random() * (max - min) + "px";
          return (
            <div
              className="article-list__item"
              key={id}
              style={{ height: articleHeight }}
            >
              <Link to={`/article/${place2._id}`}>
                <ArticleShortcut place={place2} />
              </Link>
            </div>
          );
        })}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default ArticleList;
