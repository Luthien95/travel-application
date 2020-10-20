import React, { Component } from "react";
import { Container } from "react-bootstrap";
import RichEditor from "./richEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class NewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newArticle: {},
    };

    this.addRichEditorText = this.addRichEditorText.bind(this);
  }

  addRichEditorText = (article) => {
    this.setState((prevState) => {
      let newArticle = Object.assign({}, prevState.newArticle);
      newArticle.description = article;
      return { newArticle };
    }, console.log(this.state.newArticle));
  };

  render() {
    return (
      <Container>
        <div className="new-article">
          <div className="new-article__shortcut-image">
            <FontAwesomeIcon icon={faPlus} className="new-article__icon" />
            <p>Place main image here</p>
          </div>
          <input
            className="new-article__input"
            placeholder="Type destination name..."
          />
          <input
            className="new-article__input"
            placeholder="Type destination time..."
          />
        </div>
        <RichEditor addRichEditorText={this.addRichEditorText} />
        <button>Save</button>
      </Container>
    );
  }
}

export default NewArticle;
