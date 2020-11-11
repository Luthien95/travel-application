import React, { Component } from "react";
import { Container, Col } from "react-bootstrap";
import alertMessages from "../data/alertMessages";
import RichEditor from "./richEditor";
import MessageBox from "./messageBox";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

class NewArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newArticle: {},
      visible: false,
      editedCurrentPlace: this.props.currentPlace,
    };

    this.addRichEditorText = this.addRichEditorText.bind(this);
    this.addInputData = this.addInputData.bind(this);
    this.richEditor = React.createRef();
  }

  componentDidMount() {
    if (this.props.currentPlace) {
      const currentPlace = this.props.currentPlace;
      this.richEditor.current.changeEditorState(currentPlace.description);
    }
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
    return this.state.editedCurrentPlace ? (
      <EditArticle
        visible={this.state.visible}
        alertMessage={alertMessages.postSuccessEditAlert}
        submitNewArticle={this.submitNewArticle}
        addInputData={this.addInputData}
        addRichEditorText={this.addRichEditorText}
        richEditor={this.richEditor}
        editedCurrentPlace={this.state.editedCurrentPlace}
      />
    ) : (
      <CreateArticle
        visible={this.state.visible}
        alertMessage={alertMessages.postSuccessAddAlert}
        submitNewArticle={this.submitNewArticle}
        addInputData={this.addInputData}
        addRichEditorText={this.addRichEditorText}
        richEditor={this.richEditor}
      />
    );
  }
}

const CreateArticle = ({
  visible,
  alertMessage,
  submitNewArticle,
  addInputData,
  addRichEditorText,
  richEditor,
}) => {
  return (
    <>
      <MessageBox visible={visible} message={alertMessage} />
      <Container>
        <div className="new-article">
          <form onSubmit={submitNewArticle} id="article-form">
            <InputField
              inputName="country"
              placeholderText="Type country..."
              addInputData={addInputData}
            />
            <InputField
              inputName="img"
              placeholderText="Type image url..."
              addInputData={addInputData}
            />
            <InputField
              inputName="title"
              placeholderText="Type article name..."
              addInputData={addInputData}
            />
            <InputField
              inputName="date"
              placeholderText="Type destination time..."
              addInputData={addInputData}
            />
            <RichEditor
              addRichEditorText={addRichEditorText}
              ref={richEditor}
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
};

const EditArticle = ({
  visible,
  alertMessage,
  submitNewArticle,
  addInputData,
  addRichEditorText,
  richEditor,
  editedCurrentPlace,
}) => {
  return (
    <>
      <MessageBox visible={visible} message={alertMessage} />
      <Container>
        <div className="new-article">
          <form onSubmit={submitNewArticle} id="article-form">
            <EditInputField
              inputName="country"
              placeholderText="Type country..."
              defaultValue={editedCurrentPlace.country}
              addInputData={addInputData}
            />
            <EditInputField
              inputName="img"
              placeholderText="Type image url..."
              defaultValue={editedCurrentPlace.img}
              addInputData={addInputData}
            />
            <EditInputField
              inputName="title"
              placeholderText="Type article name..."
              defaultValue={editedCurrentPlace.title}
              addInputData={addInputData}
            />
            <EditInputField
              inputName="date"
              placeholderText="Type destination time..."
              defaultValue={editedCurrentPlace.date}
              addInputData={addInputData}
            />
            <RichEditor
              addRichEditorText={addRichEditorText}
              ref={richEditor}
              editorState={editedCurrentPlace.description}
            />
            <button>Cancel</button> |
            <input
              className="new-article__button"
              type="submit"
              value="Save changes"
            />
          </form>
        </div>
      </Container>
    </>
  );
};

const InputField = ({ inputName, placeholderText, addInputData }) => {
  return (
    <Col md={12} className="p-0">
      <input
        className="new-article__input"
        name={inputName}
        placeholder=""
        onChange={addInputData}
        required
      />
      <label className="new-article__label">{placeholderText}</label>
    </Col>
  );
};

const EditInputField = ({
  inputName,
  placeholderText,
  defaultValue,
  addInputData,
}) => {
  return (
    <input
      className="new-article__input"
      name={inputName}
      placeholder={placeholderText}
      defaultValue={defaultValue}
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
