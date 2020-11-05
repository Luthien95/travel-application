import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import Loader from "./loader";

const URL = "/api/articles";

function Article() {
  const [articleList, setArticleList] = useState();
  const [currentPlace, setCurrentPlace] = useState();
  let { id } = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    //const response = await axios.get(URL);
    //setArticleList(response.data);

    axios.get(URL).then((response) => {
      setArticleList(response.data);

      response.data.map((article) => {
        return article._id === id ? setCurrentPlace(article) : null;
      });
    });
  };

  const removeArticle = (articleId) => {
    axios.delete(`/api/articles/${articleId}`).then((res) => {
      const del = articleList.filter((article) => articleId !== article._id);
      setArticleList(del);
    });
  };

  return currentPlace ? (
    <Container>
      <div className="article">
        <div className="article__image-container">
          <img
            className="article__image"
            src={currentPlace.img}
            alt={currentPlace.title}
          />
        </div>
        <h1 className="article__header">{currentPlace.title}</h1>
        <p className="article__date">{currentPlace.date}</p>
        <div className="article__description">
          {parse(currentPlace.description)}
        </div>
        <div className="article__options">
          <button
            className="article__option-button"
            onClick={() => removeArticle(currentPlace._id)}
          >
            Delete post
          </button>{" "}
          | <button className="article__option-button">Edit post</button>
        </div>
        <a className="article__button" href="/articleList">
          <FontAwesomeIcon
            icon={faCaretLeft}
            className="article__button-icon"
          />
          Go back
        </a>
      </div>
    </Container>
  ) : (
    <Loader />
  );
}

export default Article;
