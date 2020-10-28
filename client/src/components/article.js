import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

function Article() {
  const [currentPlace, setCurrentPlace] = useState();
  let { id } = useParams();
  //const currentPlace = places.find((place) => place.id == id);
  useEffect(() => {
    axios.get("/api/articles").then((response) => {
      /* setCurrentPlace(
        response.data.map((article) => (article._id == id ? article : null))
      );*/
      response.data.map((article) =>
        article._id == id ? setCurrentPlace(article) : null
      );
    });
  });

  return currentPlace ? (
    <Container>
      <div className="article">
        <div className="article__image-container">
          <img className="article__image" src={currentPlace.img} />
        </div>
        <h1 className="article__header">{currentPlace.title}</h1>
        <p className="article__date">{currentPlace.date}</p>
        <p className="article__description">
          {parse(currentPlace.description)}
        </p>
        <a href="/articleList">Go back</a>
      </div>
    </Container>
  ) : null;
}

export default Article;

/*
response.map((article) =>
        article._id == id
          ? this.setState({
              currentPlace: article,
            })
          : null
      );

      */
