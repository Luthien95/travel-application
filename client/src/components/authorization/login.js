import React, { Component } from "react";
import Cookie from "js-cookie";
import ErrorMessages from "./errorMessages";
import { filterLoginForm } from "./loginUtility";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      errorMessages: [],
      redirect: null,
    };

    this.addInputData = this.addInputData.bind(this);
  }

  addInputData(e) {
    let newPropertyName = e.target.name;
    let newPropetyValue = e.target.value;

    this.setState((prevState) => {
      let user = Object.assign({}, prevState.user);
      user[newPropertyName] = newPropetyValue;
      return { user };
    });
  }

  logIn = async (event) => {
    event.preventDefault();

    const arrayOfErrors = filterLoginForm(this.state.user);

    if (arrayOfErrors.length > 0) {
      this.setState({
        errorMessages: arrayOfErrors,
      });
      return;
    }

    /*
    await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.user),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.token) {
          Cookie.set("token", response.token);
          Cookie.set("username", response.name);

          this.setState({
            redirect: "/articleList",
          });
        } else {
          if (response) {
            this.setState((prevState) => ({
              errorMessages: [...prevState.errorMessages, response],
            }));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });*/

    axios
      .post(`/api/users/login`, this.state.user)
      .then((response) => {
        const data = response.data;

        if (data.token) {
          Cookie.set("token", data.token);
          Cookie.set("username", data.name);

          this.setState({
            redirect: "/articleList",
          });
        } else {
          if (response) {
            this.setState((prevState) => ({
              errorMessages: [...prevState.errorMessages, response],
            }));
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <form>
        <div className="container">
          <label htmlFor="name">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="name"
            autoComplete="username"
            onChange={this.addInputData}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="new-password"
            onChange={this.addInputData}
            required
          />
          <label>
            <input type="checkbox" name="remember" /> Remember me
          </label>
          <ErrorMessages errorMessages={this.state.errorMessages} />
          <button type="submit" onClick={this.logIn}>
            Login
          </button>
        </div>

        <div className="container">
          <span className="psw">
            Forgot <a href="/">password?</a>
          </span>
        </div>
      </form>
    );
  }
}

export default Login;
