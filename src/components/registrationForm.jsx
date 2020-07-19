import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { registerUser } from "../services/userService";
import { loginWithJWT } from "../services/authService";

class RegistrationForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).max(15).required().label("Password"),
    name: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .label("Name"),
  };

  doSubmit = async () => {
    try {
      const user = await registerUser(this.state.data);
      loginWithJWT(user.headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      console.log(error.response.data.message || error.response.data);
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </React.Fragment>
    );
  }
}

export default RegistrationForm;
