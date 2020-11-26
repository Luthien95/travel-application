import React from "react";
import "./../style/css/style.css";
import { Container } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Article from "./article";
import Loader from "./loader";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";

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
    axios.get("/api/articles").then((response) => {
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
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
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

const ArticleShortcut = ({ place }) => {
  const regex = /(<([^>]+)>)/gi;
  const result = place.description.replace(regex, "");

  return (
    <div className="article-shortcut">
      <div className="article-shortcut__image-container">
        <img
          className="article-shortcut__image"
          src={place.img}
          alt={place.title}
        />
      </div>
      <div className="article-shortcut__data">
        <p className="article-shortcut__city">{place.country}</p>
        <h1 className="article-shortcut__header">{place.title}</h1>
        <p className="article-shortcut__date">{place.date}</p>
        <p className="article-shortcut__description">
          {result.substring(0, 130) + "..."}
        </p>
      </div>
    </div>
  );
};

export default ArticleList;
