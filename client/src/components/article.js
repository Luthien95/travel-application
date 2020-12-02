import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import Loader from "./loader";
import NewArticle from "./newArticle";
import ArticlePreview from "./articlePreview";

const URL = "/api/articles";

function Article() {
  const [articleList, setArticleList] = useState();
  const [currentPlace, setCurrentPlace] = useState();
  const [isEditModeActive, setEditMode] = useState(false);
  let { id } = useParams();
  const history = useHistory();

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

  return currentPlace ? (
    isEditModeActive ? (
      <NewArticle currentPlace={currentPlace} />
    ) : (
      <ArticlePreview
        currentPlace={currentPlace}
        removeArticle={removeArticle}
        editArticle={editArticle}
      />
    )
  ) : (
    <Loader />
  );
}

export default Article;
