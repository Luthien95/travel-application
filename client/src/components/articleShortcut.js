import React from "react";
import { dateFormat } from "./dateFormat";

const ArticleShortcut = ({ place }) => {
  const regex = /(<([^>]+)>)/gi;
  const result = place.description.replace(regex, "");

  return (
    <div className="article-shortcut">
      <div className="article-shortcut__image-container">
        <img
          className="article-shortcut__image"
          src={place.img}
          alt={place.title}
        />
      </div>
      <div className="article-shortcut__data">
        <p className="article-shortcut__city">{place.country}</p>
        <h1 className="article-shortcut__header">{place.title}</h1>
        <p className="article-shortcut__date">
          {dateFormat(place.startDate, place.endDate)}
        </p>
        <p className="article-shortcut__description">
          {result.substring(0, 130) + "..."}
        </p>
      </div>
    </div>
  );
};

export default ArticleShortcut;
