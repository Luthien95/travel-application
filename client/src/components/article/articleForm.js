import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MessageBox from "./../messageBox";
import InputField from "./inputField";
import RichEditor from "./../richEditor";

class ArticleForm extends React.Component {
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
              <InputField
                inputName="date"
                placeholderText="Type destination time..."
                addInputData={addInputData}
                defaultValue={
                  editedCurrentPlace ? editedCurrentPlace.date : null
                }
              />
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
