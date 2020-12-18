import React, { Component } from "react";
import { filterRegisterForm } from "./registerUtility";
import ErrorMessages from "./errorMessages";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {},
      errorMessages: [],
    };

    this.addInputData = this.addInputData.bind(this);
    this.submitNewUser = this.submitNewUser.bind(this);
  }

  addInputData(e) {
    let newPropertyName = e.target.name;
    let newPropetyValue = e.target.value;

    this.setState((prevState) => {
      let newUser = Object.assign({}, prevState.newUser);
      newUser[newPropertyName] = newPropetyValue;
      return { newUser };
    });
  }

  submitNewUser = async (event) => {
    event.preventDefault();
    const { newUser } = this.state;
    let newUserObject = null;

    const arrayOfErrors = filterRegisterForm(newUser);

    if (arrayOfErrors.length > 0) {
      this.setState({
        errorMessages: arrayOfErrors,
      });
      return;
    }

    newUserObject = {
      name: newUser.name,
      password: newUser.password,
    };

    /*await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserObject),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          this.setState((prevState) => ({
            errorMessages: [...prevState.errorMessages, response],
          }));
        }

        if (response === true) this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
      });*/

    axios
      .post(`/api/users/signup`, newUserObject)
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          this.setState((prevState) => ({
            errorMessages: [...prevState.errorMessages, response],
          }));
        }

        if (response === true) this.props.history.push("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  render() {
    return (
      <form>
        <div className="container form__container">
          <label htmlFor="name" className="form__label">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="name"
            autoComplete="username"
            className="form__input"
            onChange={this.addInputData}
            required
          />
          <label htmlFor="password" className="form__label">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="current-password"
            className="form__input"
            onChange={this.addInputData}
            style={{
              border: this.state.differentPasswordsError
                ? "1px solid #c10000"
                : "none",
            }}
            onBlur={() => this.setState({ differentPasswordsError: false })}
            required
          />{" "}
          <label htmlFor="repeatPassword" className="form__label">
            <b>Repeat password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="repeatPassword"
            autoComplete="current-password"
            className="form__input"
            onChange={this.addInputData}
            style={{
              border: this.state.differentPasswordsError
                ? "1px solid #c10000"
                : "none",
            }}
            onBlur={() => this.setState({ differentPasswordsError: false })}
            required
          />
          <ErrorMessages errorMessages={this.state.errorMessages} />
          <button type="submit" onClick={this.submitNewUser}>
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default Register;
