import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Loader from "./loader";

function Article() {
  const [currentPlace, setCurrentPlace] = useState();
  let { id } = useParams();

  useEffect(() => {
    axios.get("/api/articles").then((response) => {
      response.data.map((article) =>
        article._id === id ? setCurrentPlace(article) : null
      );
    });
  });

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
        <p className="article__description">
          {parse(currentPlace.description)}
        </p>
        <a href="/articleList">Go back</a>
      </div>
    </Container>
  ) : (
    <Loader />
  );
}

export default Article;
