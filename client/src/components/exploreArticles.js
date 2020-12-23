import React from "react";
import "./../style/css/style.css";
import { Container } from "react-bootstrap";
import { Route, Link, Switch } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Article from "./article";
import Loader from "./loader";
import ArticleShortcut from "./articleShortcut";
import Search from "./search";
import axios from "axios";

class ExploreArticles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articleList: null,
      visibleItems: 6,
    };

    this.loadMoreItems = this.loadMoreItems.bind(this);
    this.loadPostWithStringInTitle = this.loadPostWithStringInTitle.bind(this);
  }

  componentDidMount = () => {
    axios
      .get("/api/articles/publicPosts")
      .then((response) => {
        this.setState({
          articleList: response.data,
        });
      })
      .catch((error) => console.log(error));
  };

  loadMoreItems() {
    this.setState((prev) => {
      return { visibleItems: prev.visibleItems + 6 };
    });
  }

  loadPostWithStringInTitle(string) {
    axios
      .get(`/api/articles/searchInTitle?title=${string}`)
      .then((response) => {
        this.setState({
          articleList: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { articleList, visibleItems } = this.state;

    if (articleList) {
      return (
        <>
          <Search loadPostWithStringInTitle={this.loadPostWithStringInTitle} />
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
              <Route
                path="/articles/:id"
                component={Article}
                isEditable={false}
              />
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
              <Link
                to={{
                  pathname: `/article/${place2._id}`,
                  state: {
                    isEditable: false,
                  },
                }}
              >
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
