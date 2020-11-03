import React, { Component } from "react";
import { Container } from "react-bootstrap";
import RichEditor from "./richEditor";

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

    console.log(this.state.newArticle);
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

  handleSubmit = async (event) => {
    /*event.preventDefault();
    console.log(this.state.newArticle);

    const article = this.state.newArticle;

    axios
      .post(`/api/articles`, { article })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.log(err));*/

    event.preventDefault();
    const response = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.newArticle),
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    //const body = await response.text();
    //this.setState({ responseToPost: body });
  };

  render() {
    return (
      <Container>
        <div className="new-article">
          <form onSubmit={this.handleSubmit}>
            <input
              className="new-article__input"
              name="country"
              placeholder="Type country..."
              onChange={this.addInputData}
              required
            />
            <input
              className="new-article__input"
              name="img"
              placeholder="Type image url..."
              onChange={this.addInputData}
              required
            />
            <input
              className="new-article__input"
              name="title"
              placeholder="Type article name..."
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

/*
<div className="new-article__shortcut-image">
              <FontAwesomeIcon icon={faPlus} className="new-article__icon" />
              <p>Place main image here</p>
            </div>

            */
