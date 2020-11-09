import React, { Component } from "react";
import { Container } from "react-bootstrap";
import alertMessages from "../data/alertMessages";
import RichEditor from "./richEditor";
import MessageBox from "./messageBox";

class NewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newArticle: {},
      visible: false,
    };

    this.addRichEditorText = this.addRichEditorText.bind(this);
    this.addInputData = this.addInputData.bind(this);
    this.richEditor = React.createRef();
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

  submitNewArticle = async (event) => {
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
        this.showAlertBox();
        this.clearInputFields();
      })
      .catch((err) => console.log(err));
  };

  showAlertBox = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 6000);
    });
  };

  clearInputFields = () => {
    document.getElementById("article-form").reset();
    this.richEditor.current.clearEditorState();
  };

  render() {
    return (
      <>
        <MessageBox
          visible={this.state.visible}
          message={alertMessages.postSuccessAddAlert}
        />
        <Container>
          <div className="new-article">
            <form onSubmit={this.submitNewArticle} id="article-form">
              <InputField
                inputName="country"
                placeholderText="Type country..."
                addInputData={this.addInputData}
              />
              <InputField
                inputName="img"
                placeholderText="Type image url..."
                addInputData={this.addInputData}
              />
              <InputField
                inputName="title"
                placeholderText="Type article name..."
                addInputData={this.addInputData}
              />
              <InputField
                inputName="date"
                placeholderText="Type destination time..."
                addInputData={this.addInputData}
              />
              <RichEditor
                addRichEditorText={this.addRichEditorText}
                ref={this.richEditor}
              />
              <input
                className="new-article__button"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </Container>
      </>
    );
  }
}

const InputField = ({ inputName, placeholderText, addInputData }) => {
  return (
    <input
      className="new-article__input"
      name={inputName}
      placeholder={placeholderText}
      onChange={addInputData}
      required
    />
  );
};

export default NewArticle;

/*
<div className="new-article__shortcut-image">
              <FontAwesomeIcon icon={faPlus} className="new-article__icon" />
              <p>Place main image here</p>
            </div>

            */
