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
    this.addInputData = this.addInputData.bind(this);
  }

  addRichEditorText = (article) => {
    this.setState((prevState) => {
      let newArticle = Object.assign({}, prevState.newArticle);
      newArticle.description = article;
      return { newArticle };
    });
  };

  addInputData(e) {
    let newPropertyName = e.target.name;
    let newPropetyValue = e.target.value;

    this.setState((prevState) => {
      let newArticle = Object.assign({}, prevState.newArticle);
      newArticle[newPropertyName] = newPropetyValue;
      return { newArticle };
    });
  }

  render() {
    return (
      <Container>
        <div className="new-article">
          <form>
            <div className="new-article__shortcut-image">
              <FontAwesomeIcon icon={faPlus} className="new-article__icon" />
              <p>Place main image here</p>
            </div>
            <input
              className="new-article__input"
              name="title"
              placeholder="Type destination name..."
              onChange={this.addInputData}
              required
            />
            <input
              className="new-article__input"
              name="date"
              placeholder="Type destination time..."
              onChange={this.addInputData}
              required
            />
            <RichEditor addRichEditorText={this.addRichEditorText} />
            <input
              className="new-article__button"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </Container>
    );
  }
}

export default NewArticle;
