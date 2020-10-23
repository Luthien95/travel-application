import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import places from "./../data/articles.json";

function Article() {
  let { id } = useParams();
  const currentPlace = places.find((place) => place.id == id);

  return (
    <Container>
      <div className="article">
        <div className="article__image-container">
          <img className="article__image" src={currentPlace.img} />
        </div>
        <h1 className="article__header">{currentPlace.title}</h1>
        <p className="article__date">{currentPlace.date}</p>
        <p className="article__description">{currentPlace.description}</p>
        <a href="/articleList">Go back</a>
      </div>
    </Container>
  );
}

export default Article;
