import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MessageBox from "./../messageBox";
import InputField from "./inputField";
import RichEditor from "./../richEditor";

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todayDate: null,
      minDate: null,
    };

    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    this.setState({
      todayDate: today,
    });
  }

  changeDate = (e) => {
    this.props.addInputData(e);

    this.setState({
      minDate: e.target.value,
    });
  };

  render() {
    const {
      visible,
      alertMessage,
      submitArticle,
      addInputData,
      addRichEditorText,
      richEditor,
      editedCurrentPlace,
    } = this.props;

    const { todayDate, minDate } = this.state;

    return (
      <>
        <MessageBox visible={visible} message={alertMessage} />
        <Container>
          <div className="new-article">
            <form onSubmit={submitArticle} id="article-form">
              <InputField
                inputName="country"
                placeholderText="Type country..."
                addInputData={addInputData}
                defaultValue={
                  editedCurrentPlace ? editedCurrentPlace.country : null
                }
              />
              <InputField
                inputName="img"
                placeholderText="Type image url..."
                addInputData={addInputData}
                defaultValue={
                  editedCurrentPlace ? editedCurrentPlace.img : null
                }
              />
              <InputField
                inputName="title"
                placeholderText="Type article name..."
                addInputData={addInputData}
                defaultValue={
                  editedCurrentPlace ? editedCurrentPlace.title : null
                }
              />
              <label for="start">Start date:</label>

              <input
                type="date"
                name="startDate"
                defaultValue={
                  editedCurrentPlace ? editedCurrentPlace.startDate : todayDate
                }
                max={todayDate}
                onChange={this.changeDate}
              ></input>
              <label for="start">End date:</label>

              <input
                type="date"
                name="endDate"
                defaultValue={
                  editedCurrentPlace ? editedCurrentPlace.endDate : todayDate
                }
                min={minDate ? minDate : null}
                max={todayDate}
                onChange={addInputData}
              ></input>
              <RichEditor
                addRichEditorText={addRichEditorText}
                ref={richEditor}
              />
              {editedCurrentPlace ? (
                <EditedArticleButtons />
              ) : (
                <NewArticleButtons />
              )}
            </form>
          </div>
        </Container>
      </>
    );
  }
}

const NewArticleButtons = () => {
  return <input className="new-article__button" type="submit" value="Submit" />;
};

const EditedArticleButtons = () => {
  const history = useHistory();

  return (
    <>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        Cancel
      </button>{" "}
      |
      <input
        className="new-article__button"
        type="submit"
        value="Save changes"
      />
    </>
  );
};

export default ArticleForm;
