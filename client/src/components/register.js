import React, { Component } from "react";

const differentPasswordsMessage = {
  message: "The entered passwords do not match.",
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {},
      differentPasswordsError: false,
      errorMessage: null,
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

    if (newUser.password === newUser.repeatPassword) {
      newUserObject = {
        name: newUser.name,
        password: newUser.password,
      };
    } else {
      this.setState((prevState) => ({
        errorMessages: [...prevState.errorMessages, differentPasswordsMessage],
      }));

      return;
    }

    await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserObject),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data.message);

          const b = data;
          this.setState((prevState) => ({
            errorMessages: [...prevState.errorMessages, b],
          }));
        } else {
          console.log("No error i think....");
        }
      })
      .catch((err) => console.error("3" + err));
  };

  render() {
    console.log(this.state.errorMessages);
    return (
      <>
        <form>
          <div className="container form__container">
            <label htmlFor="name" className="form__label">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="name"
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
            {this.state.differentPasswordsError ? (
              <p className="error-text">{differentPasswordsMessage}</p>
            ) : null}
            {this.state.errorMessage ? (
              <p className="error-text">{this.state.errorMessage}</p>
            ) : null}
            <ErrorMessages errorMessages={this.state.errorMessages} />
            <button type="submit" onClick={this.submitNewUser}>
              Register
            </button>
          </div>
        </form>
      </>
    );
  }
}

const ErrorMessages = ({ errorMessages }) => {
  if (errorMessages.length > 0) {
    return (
      <>
        {errorMessages.map((error, id) => {
          return (
            <p className="error-text" key={id}>
              {error.message}
            </p>
          );
        })}
      </>
    );
  }

  return null;
};

export default Register;
