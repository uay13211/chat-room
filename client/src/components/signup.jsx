//jshint esversion:6
import React, { useState, useEffect, useContext } from "react";
import "./css/login.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import loginAction from "./action/login";

const axios = require("axios");
axios.defaults.withCredentials = true;

export function SignUp() {
  // local state
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({
    usernameError: "",
    emailError: "",
    passwordError: ""
  });
  // redux state
  const authetication = useSelector(state => state.Authetication);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(authetication);

  const onChanegeData = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // if already login, redirect to homepage
  useEffect(() => {
    if (authetication) {
      history.push("/");
    }
  }, [authetication]);

  //submit data for register
  const submitData = e => {
    e.preventDefault();
    // check the password if it is too short
    if (data.password.length < 8) {
      document.getElementById("password-input").classList.add("is-invalid");
      setErrorMessage({
        ...errorMessage,
        passwordError: "Password must be at least 8 characters"
      });
      return;
    }
    if (
      document.getElementById("username-input").classList.contains("is-invalid")
    ) {
      document.getElementById("username-input").classList.remove("is-invalid");
    }
    if (
      document.getElementById("email-input").classList.contains("is-invalid")
    ) {
      document.getElementById("email-input").classList.remove("is-invalid");
    }
    if (
      document.getElementById("password-input").classList.contains("is-invalid")
    ) {
      document.getElementById("password-input").classList.remove("is-invalid");
    }
    setErrorMessage({ ...errorMessage, usernameError: "" });
    setErrorMessage({ ...errorMessage, emailError: "" });
    setErrorMessage({ ...errorMessage, passwordError: "" });
    axios
      .post("/signup", data)
      .then(function(res) {
        console.log(res.data);
        if (res.data === "User added") {
          // auto login after register
          login(data);
        } else if (res.data === "User already exist") {
          document.getElementById("username-input").classList.add("is-invalid");
          setErrorMessage({ ...errorMessage, usernameError: res.data });
        } else if (res.data === "Email already signup") {
          document.getElementById("email-input").classList.add("is-invalid");
          setErrorMessage({ ...errorMessage, emailError: res.data });
        }
      })
      .catch(err => console.log(err));
    setData({ username: "", email: "", password: "" });
  };

  // login
  const login = user => {
    axios
      .post("/login", user)
      .then(function(res) {
        if (res.data === "Success") {
          dispatch(loginAction());
          history.push("/");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-page">
      <div className="Register-card">
        <div className="card">
          <div className="card-header bg-warning">
            <h2 className="text-center font-weight-bold">Sign Up</h2>
          </div>
          <div className="card-body">
            <div className="login-form">
              <form onSubmit={submitData}>
                <div className="form-group">
                  <label className="form-text">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username-input"
                    name="username"
                    onChange={onChanegeData}
                    value={data.username}
                    placeholder="Username"
                    required
                    autoFocus
                  />
                  {errorMessage.usernameError ? (
                    <div className="invalid-feedback">
                      {errorMessage.usernameError}
                    </div>
                  ) : (
                    errorMessage.usernameError
                  )}
                </div>
                <div className="form-group">
                  <label className="form-text">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email-input"
                    name="email"
                    onChange={onChanegeData}
                    value={data.email}
                    placeholder="Email"
                    required
                  />
                  {errorMessage.emailError ? (
                    <div className="invalid-feedback">
                      {errorMessage.emailError}
                    </div>
                  ) : (
                    errorMessage.emailError
                  )}
                </div>
                <div className="form-group">
                  <label className="form-text">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-input"
                    name="password"
                    onChange={onChanegeData}
                    value={data.password}
                    placeholder="Password"
                    required
                  />
                  {errorMessage.passwordError ? (
                    <div className="invalid-feedback">
                      {errorMessage.passwordError}
                    </div>
                  ) : (
                    errorMessage.passwordError
                  )}
                </div>
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-block btn-warning btn-lg my-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
