import axios from "axios";

export const POST = (data) => {
  return axios("http://localhost:5000/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
};

/*
handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch("/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ post: this.state.post }),
  });
  const body = await response.text();
  this.setState({ responseToPost: body });
};
*/
