import React, { Component } from "react";
import Cookie from "js-cookie";
import ErrorMessages from "./errorMessages";
import { filterLoginForm } from "./loginUtilitiy";
import { Redirect } from "react-router-dom";

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

    await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.user),
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.headers["x-auth-token"]);
        if (response.token) {
          Cookie.set("token", response.token);

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
    const token = Cookie.get("token") ? Cookie.get("token") : null;
    console.log(token);
    console.log(this.state.user);

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <>
        <p>Login</p>
        <form>
          <div className="container">
            <label htmlFor="name">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="name"
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
              Forgot <a href="#">password?</a>
            </span>
          </div>
        </form>
      </>
    );
  }
}

export default Login;
