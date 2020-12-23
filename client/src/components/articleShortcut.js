import React from "react";
import axios from "axios";
import { dateFormat } from "./dateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { farHeart } from "@fortawesome/free-solid-svg-icons";

class ArticleShortcut extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likesCount: null,
      ifUserLiked: null,
    };

    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.loadArticleLikeNumber = this.loadArticleLikeNumber.bind(this);
  }

  componentDidMount() {
    this.loadArticleLikeNumber();
  }

  loadArticleLikeNumber() {
    let place = this.props.place;

    axios.get(`/api/likes?articleId=${place._id}`).then((response) => {
      this.setState({
        likesCount: response.data.numberOfLikes,
        ifUserLiked: response.data.ifUserLiked,
      });
    });
  }

  addLike = async (event) => {
    event.preventDefault();
    let { place } = this.props;
    axios
      .post(`/api/likes/addLikeToArticle`, {
        articleId: place._id,
        userId: place.userId,
      })
      .then((res) => {
        this.loadArticleLikeNumber();
      })
      .catch((err) => console.log(err));
  };

  removeLike = async (event) => {
    event.preventDefault();
    let { place } = this.props;
    axios
      .delete(`/api/likes/removeLikeFromArticle`, {
        params: { articleId: place._id },
      })
      .then((res) => {
        this.loadArticleLikeNumber();
      })
      .catch((err) => console.log(err));
  };

  render() {
    let { place } = this.props;
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
          <p>likes: {this.state.likesCount}</p>
          {this.state.ifUserLiked ? (
            <button onClick={this.removeLike}>
              <FontAwesomeIcon icon={faHeart} />
              Remove like
            </button>
          ) : (
            <button onClick={this.addLike}>
              <FontAwesomeIcon icon={faHeart} />
              Add like
            </button>
          )}
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
  }
}

export default ArticleShortcut;

/*const ArticleShortcut = ({ place }) => {
  const regex = /(<([^>]+)>)/gi;
  const result = place.description.replace(regex, "");
  let p = 0;

  useEffect(() => {
    axios.get(`/api/likes?articleId=${place._id}`).then((response) => {
      console.log(response.data);
      p = response.data;
    });
  }, []);

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
        <p>ok + {p}</p>
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
*/
