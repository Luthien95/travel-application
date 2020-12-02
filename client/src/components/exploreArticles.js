import React from "react";
import "./../style/css/style.css";
import { Container } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import Article from "./article";
import Loader from "./loader";
import { dateFormat } from "./dateFormat";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import axios from "axios";

class ExploreArticles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleList: null,
      visibleItems: 5,
    };

    this.loadMoreItems = this.loadMoreItems.bind(this);
  }

  componentDidMount = () => {
    axios
      .get("/api/articles")
      .then((response) => {
        const list = response.data.filter(
          (article) => article.isPublic === true
        );
        this.setState({
          articleList: list,
        });
      })
      .catch((error) => console.log(error));
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
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 5, 900: 3 }}>
      <Masonry>
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
        <p className="article-shortcut__date">
          {dateFormat(place.startDate, place.endDate)}
        </p>
        <p className="article-shortcut__description">
          {result.substring(0, 130) + "..."}
        </p>
      </div>
    </div>
  );
};

export default ExploreArticles;
