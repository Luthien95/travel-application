import React from "react";
import parse from "html-react-parser";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { dateFormat } from "./dateFormat";

const articlePreview = ({
  currentPlace,
  removeArticle,
  editArticle,
  isEditable,
  likeArticle,
}) => {
  return (
    <Container>
      <div className="article">
        <div className="article__image-container">
          <img
            className="article__image"
            src={currentPlace.img}
            alt={currentPlace.title}
          />
        </div>
        <p>{currentPlace.likes} likes</p>
        <button onClick={() => likeArticle()}>Like</button>
        <h1 className="article__header">{currentPlace.title}</h1>
        <p className="article__date">
          {dateFormat(currentPlace.startDate, currentPlace.endDate)}
        </p>
        <div className="article__description">
          {parse(currentPlace.description)}
        </div>
        {isEditable ? (
          <div className="article__options">
            <button
              className="article__option-button"
              onClick={() => removeArticle(currentPlace._id)}
            >
              Delete post
            </button>{" "}
            |{" "}
            <button
              className="article__option-button"
              onClick={() => editArticle(currentPlace)}
            >
              Edit post
            </button>
          </div>
        ) : null}
        <a className="article__button" href="/articleList">
          <FontAwesomeIcon
            icon={faCaretLeft}
            className="article__button-icon"
          />
          Go back
        </a>
      </div>
    </Container>
  );
};

export default articlePreview;
