import React from "react";
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
