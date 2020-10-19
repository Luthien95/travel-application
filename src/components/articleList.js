import React from "react";
import "./../style/css/style.css";
import Article from "./article";
import places from "./../data/articles.json";

class ArticleList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    //this.loadOptions = this.loadOptions.bind(this);
  }

  render() {
    return places.map((place2) => <Article place={place2} />);
  }
}

export default ArticleList;
