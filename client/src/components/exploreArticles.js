import React from "react";
import "./../style/css/style.css";
import { Container } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import Article from "./article";
import Loader from "./loader";
import ArticleShortcut from "./articleShortcut";
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

export default ExploreArticles;
