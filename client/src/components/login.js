import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
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

  render() {
    return (
      <>
        <p>Login</p>
        <form action="action_page.php" method="post">
          <div className="imgcontainer">
            <img src="img_avatar2.png" alt="Avatar" className="avatar" />
          </div>

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
            <button type="submit">Login</button>
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
