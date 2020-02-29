import React, { Component } from "react";
import classes from "./Auth.module.css";
import axios from "axios";
import App from "./App";

let result = false;
let genericError = null;

class Auth extends Component {
  state = {
    username: "",
    password: "",
    twoFactor: "",
    logInClicked: false,
    backEndToken: ""
  };

  usernameChangeHandler = event => {
    this.setState({ username: event.target.value });
  };

  passwordChangeHandler = event => {
    this.setState({ password: event.target.value });
  };

  pinChangeHandler = event => {
    this.setState({ twoFactor: event.target.value });
  };

  onFormSubmitHandler = event => {
    event.preventDefault();
    const { username, password } = { ...this.state };
    const loginDetails = { username: username, password: password };

    axios
      .post("https://mssched-backend.herokuapp.com/verify", loginDetails)
      .then(response => {
        console.log(response.data);
        let res = response.data;
        if (res === "Incorrect login details") {
          genericError = (
            <p style={{ color: "red" }}>Wrong password and details</p>
          );
          this.setState({ logInClicked: false });
        } else {
          this.setState({ logInClicked: true });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitPinHandler = () => {
    let frontEndPin = this.state.twoFactor;
    axios
      .get(`https://mssched-backend.herokuapp.com/verify-pin/${frontEndPin}`)
      .then(response => {
        // console.log(response.data);
        this.setState(
          { backEndToken: response.data, twoFactor: frontEndPin },
          () => {
            if (
              parseInt(this.state.backEndToken) ===
              parseInt(this.state.twoFactor)
            ) {
              setTimeout(() => {
                result = true;
              }, 2000);
              return true;
            } else {
              return false;
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
    //   if (frontEndPin )
    // console.log("submitPinHandler working");
  };

  render = () => {
    if (result) {
      return <App token={this.state.backEndToken} />;
    } else {
      return (
        <div className={classes.Auth}>
          <h1>Message Scheduler</h1>
          <p>by Christopher Lye</p>
          <br />
          <form onSubmit={this.onFormSubmitHandler}>
            <p>Username</p>
            <input
              className="inputBox"
              type="text"
              onChange={this.usernameChangeHandler}
              value={this.state.username}
            />
            <p>Password</p>
            <input
              className="inputBox"
              type="password"
              onChange={this.passwordChangeHandler}
              value={this.state.password}
            />

            {this.state.logInClicked ? (
              <div>
                <p>6 Digit Pin</p>
                <input
                  className="inputBox"
                  type="password"
                  onChange={this.pinChangeHandler}
                  value={this.state.twoFactor}
                />
              </div>
            ) : null}
            <br />
            {genericError}
            <br />
            {!this.state.logInClicked ? (
              <button className={classes.LoginButton} type="submit">
                Login
              </button>
            ) : null}
          </form>
          {this.state.logInClicked ? (
            <button
              className={classes.ConfirmButton}
              type="submit"
              onClick={this.submitPinHandler}
            >
              Confirm
            </button>
          ) : null}
        </div>
      );
    }
  };
}

export default Auth;
