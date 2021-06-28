import React, { Component } from "react";
import Header from "../../commons/header/Header";
import "./Login.css";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Redirect } from "react-router";
const styles = {
  card: {
    padding: "15px",
    position: "relative",
    top: "20px",
    left: "50%",
    width: "325px",
    transform: "translateX(-50%)",
  },
  title: {
    fontSize: 20,
  },
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameRequired: "dispNone",
      passwordRequired: "dispNone",
      incorrectUsernamePassword: "dispNone",
    };
  }

  loginHoverHandler = (e) => {
    e.target.style.cursor = "pointer";
  };

  inputUsernameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  inputPasswordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  loginClickHandler = () => {
    this.setState({ incorrectUsernamePassword: "dispNone" });
    this.state.username.trim() === ""
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.password.trim() === ""
      ? this.setState({ passwordRequired: "dispBlock" })
      : this.setState({ passwordRequired: "dispNone" });

    if (
      this.state.username.trim() === "" ||
      this.state.password.trim() === ""
    ) {
      return;
    }

    if (
      this.state.username.trim() === "admin" &&
      this.state.password.trim() === "admin"
    ) {
      sessionStorage.setItem(
        "access-token",
        "IGQVJYTHNyMW1ZAY0V1U1NpOWVWSXNQWEhPNDBWLUhtTUo3WS10YXVKTENmNlRPY2ExMmQ1emhhaC1ZAM2R3eWRuWnpIVTk3ZA3U4Ry1JRlZAWcHMyWmJoZAzdHNUxtSGRPMWFPQ3Rhc0lROW91QmU5dkJhVQZDZD"
      );
      this.setState({ incorrectUsernamePassword: "dispNone" });
      this.props.onIsLoggedInChanged(true);
    } else {
      this.setState({ incorrectUsernamePassword: "dispBlock" });
    }
  };
  render() {
    if (this.props.isLoggedIn === true) {
      return (
        <Redirect to={{ pathname: "/home", state: { loginSuccess: true } }} />
      );
    }

    return (
      <div>
        <Header
          isLoggedIn={this.props.isLoggedIn}
          allPosts={this.state.allPosts}
          showSearchBox={true}
          onIsLoggedInChanged={this.onLoginChange}
          {...this.props}
        />
        <Card style={styles.card}>
          <CardContent>
            <Typography style={styles.title}>LOGIN</Typography>
            <br />
            <FormControl required style={{ width: "100%" }}>
              <InputLabel htmlFor="username"> Username </InputLabel>
              <Input
                id="username"
                type="text"
                username={this.state.username}
                onChange={this.inputUsernameChangeHandler}
              />
              <FormHelperText className={this.state.usernameRequired}>
                <span className="red">required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <FormControl required style={{ width: "100%" }}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                password={this.state.password}
                onChange={this.inputPasswordChangeHandler}
              />
              <FormHelperText className={this.state.passwordRequired}>
                <span className="red">required</span>
              </FormHelperText>
            </FormControl>
            <br />
            <br />
            <div className={this.state.incorrectUsernamePassword}>
              <span className="red"> Incorrect username and/or password </span>
            </div>
            <br />
            <Button
              variant="contained"
              color="primary"
              onMouseOver={this.loginHoverHandler}
              onClick={this.loginClickHandler}
            >
              LOGIN
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}
