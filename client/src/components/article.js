import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import Loader from "./loader";
import NewArticle from "./newArticle";
import ArticlePreview from "./articlePreview";

const URL = "/api/articles";

function Article() {
  const [articleList, setArticleList] = useState();
  const [currentPlace, setCurrentPlace] = useState();
  const [isEditModeActive, setEditMode] = useState(false);
  const location = useLocation();
  const history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      axios.get(URL).then((response) => {
        setArticleList(response.data);

        response.data.map((article) => {
          return article._id === id ? setCurrentPlace(article) : null;
        });
      });
    };
    getData();
  }, [id]);

  const removeArticle = (articleId) => {
    axios.delete(`/api/articles/${articleId}`).then((res) => {
      const del = articleList.filter((article) => articleId !== article._id);
      setArticleList(del);
    });

    history.push("/articleList");
  };

  const editArticle = () => {
    setEditMode(true);
  };

  const goBackToPreview = () => {
    setTimeout(() => {
      setEditMode(false);
    }, 6000);
  };

  const likeArticle = () => {
    var p = currentPlace;
    p.likes = p.likes + 1;

    axios
      .put(`/api/articles/likeArticle/${currentPlace._id}`, { likes: 2 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return currentPlace ? (
    isEditModeActive ? (
      <NewArticle
        currentPlace={currentPlace}
        goBackToPreview={goBackToPreview}
      />
    ) : (
      <ArticlePreview
        currentPlace={currentPlace}
        removeArticle={removeArticle}
        editArticle={editArticle}
        isEditable={location.state.isEditable}
        likeArticle={likeArticle}
      />
    )
  ) : (
    <Loader />
  );
}

export default Article;
