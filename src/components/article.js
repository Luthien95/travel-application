/*import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./../style/css/style.css";

class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    //this.loadOptions = this.loadOptions.bind(this);
  }

  render() {
    return <ArticleElement article={this.props.place} />;
  }
}

const ArticleElement = ({ article }) => {
  let { article } = useParams();

  return (
    <div className="article">
      <div className="article__image-container">
        <img className="article__image" src={article.img} />
      </div>
      <h1 className="article__header">{article.title}</h1>
      <p className="article__date">{article.date}</p>
      <p className="article__description">{article.description}</p>
    </div>
  );
};

export default Article;
*/

import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import places from "./../data/articles.json";

function Article() {
  let { id } = useParams();
  const currentPlace = places.find((place) => place.id == id);

  return (
    <Container>
      <div className="article">
        <div className="article__image-container">
          <img className="article__image" src={currentPlace.img} />
        </div>
        <h1 className="article__header">{currentPlace.title}</h1>
        <p className="article__date">{currentPlace.date}</p>
        <p className="article__description">{currentPlace.description}</p>
      </div>
    </Container>
  );
}

export default Article;
