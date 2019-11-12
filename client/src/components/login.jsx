import React, { useState, useEffect, useContext } from "react";
import "./css/login.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import loginAction from "./action/login";
import logioutAction from "./action/logout";

const axios = require("axios");
axios.defaults.withCredentials = true;

export function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState({
    usernameError: "",
    passwordError: ""
  });
  const authetication = useSelector(state => state.Authetication);
  const dispatch = useDispatch();

  let history = useHistory();

  //   // if already login, redirect to homepage
  //   useEffect(()=>{
  //     axios.post('/api/users/auth')
  //     .then(function(res){
  //       if(res.status===200){
  //         state.setAutheticated(true);
  //         history.push('/');
  //       }
  //     })
  //     .catch(err => state.setAutheticated(false));
  //   }, [state.autheticated])

  const onChanegeData = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // login
  const login = user => {
    if (
      document.getElementById("username-input").classList.contains("is-invalid")
    ) {
      document.getElementById("username-input").classList.remove("is-invalid");
    }
    if (
      document.getElementById("password-input").classList.contains("is-invalid")
    ) {
      document.getElementById("password-input").classList.remove("is-invalid");
    }
    setErrorMessage({ ...errorMessage, usernameError: "" });
    setErrorMessage({ ...errorMessage, passwordError: "" });

    axios
      .post("http://localhost:5000/api/login", user)
      .then(function(res) {
        if (res.data === "Success") {
          dispatch(loginAction());
          history.push("/");
        } else {
          if (res.data.message === "User does not exist") {
            document
              .getElementById("username-input")
              .classList.add("is-invalid");
            setErrorMessage({
              ...errorMessage,
              usernameError: "Unknown User or Email"
            });
          } else if (res.data.message === "Incorrect Password") {
            document
              .getElementById("password-input")
              .classList.add("is-invalid");
            setErrorMessage({
              ...errorMessage,
              passwordError: res.data.message
            });
          }
        }
      })
      .catch(err => console.log(err));
  };

  //submit data for login
  const submitData = e => {
    e.preventDefault();
    const user = data;
    login(user);
    setData({ username: "", password: "" });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="card">
          <div className="card-header bg-warning">
            <h2 className="text-center font-weight-bold">Login</h2>
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
                    placeholder="Username or Email"
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
                  value="Login"
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
