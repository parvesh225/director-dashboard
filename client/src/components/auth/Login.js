import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css";
import Welcome from "../images/welcome-img.png";
import G20 from "../images/G20.jpg";
import Logo from "../images/FinalLOGO.jpg";
import NiuaLogo from "../images/NIUA_logo.png";

import axios from 'axios';


export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: 0,
      Login: {
        emp_code: "",
        password: "",
      },
      resStatus: {
        isError:false,
        message: []
      },
      redirect: false,
    };

    this.togglePassword = this.togglePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loginBtn = this.loginBtn.bind(this);
  }

  togglePassword(e) {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  handleChange(e) {
    var login = this.state.Login;
    login[e.target.name] = e.target.value;
    this.setState({ Login: login });
  };

  loginBtn() {
    var thizz = this;
    //send request to server for login
    axios({
      method: "post",
      url: process.env.REACT_APP_BASE_URL + "/api/user/login",
      data: thizz.state.Login,
    })
    .then(function (response) {
    console.log(response?.data);
      var data = response?.data;
        if (data.status === true && data.tokenKey) {
          thizz.setState({ redirect: true });
          localStorage.setItem("AUTH_TOKEN", data.tokenKey);
          
        }
    })
    .catch(function (error) {
      //handle error
      console.log(error.response.data.status);
      if (error.response.data.status === false) {
        var response = error.response.data;
        var resStatus = thizz.state.resStatus;
        resStatus.isError = true;
        resStatus.messages = [response.message];
        thizz.setState({ resStatus: resStatus });
      }
    });

  }

  render() {

    if (localStorage.getItem("AUTH_TOKEN")) {
      return <Navigate to="/dashboard" />;
    }
    return (
      <>
        <section
          className="ftco-section img js-fullheight"
          style={{ backgroundImage: `url(${Welcome})`, height: "100vh" }}
        >
          <div className="container">
            <div className="row justify-content-center text-center">
              <div
                className="col-md-6 p-4"
                style={{ backgroundColor: "rgba(6 6 7 / 60%)" }}
              >
                <h2 className="heading-section  my-2">
                  <img
                    src={G20}
                    className="img-thumbnail rounded"
                    alt=""
                    width="200px"
                  />
                  <img
                    src={Logo}
                    className="img-thumbnail rounded"
                    alt=""
                    width="138px"
                  />
                </h2>
                <p className="p-2">
                  The National Institute of Urban Affairs (NIUA) is India’s
                  leading national think tank on urban planning and development.
                  As a hub for generation and dissemination of cutting-edge
                  research in the urban sector, NIUA seeks to provide innovative
                  solutions to address the challenges of a fast urbanising
                  India, and pave the way for more inclusive and sustainable
                  cities of the future.
                </p>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="login-wrap p-0">
                  <form action="#" className="signin-form card bg-dark p-4">
                    <div className="card-header p-2 mb-1">
                      <div className="row">
                        <div className="col-md-6">
                          <img
                            src={NiuaLogo}
                            className="img-thumbnail"
                            alt=""
                            width="100px"
                          />
                        </div>
                        <div className="col-md-6">Have an account ?</div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="emp_code"
                        id="emp_code"
                        className="form-control"
                        placeholder="Employee Code"
                        value={this.state.Login.emp_code}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        id="password"
                        name="password"
                        type={this.state.showPassword ? "text" : "password"}
                        value={this.state.Login.password}
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <span
                        toggle="#password-field"
                        className="fa fa-fw fa-eye field-icon toggle-password"
                        onClick={this.togglePassword}
                      ></span>
                    </div>
                    <div className="form-group">
                      <button
                        type="button"
                        className="form-control btn btn-primary submit px-3"
                        onClick={this.loginBtn}
                        id="loginBtn"
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50">
                        <label className="checkbox-wrap checkbox-primary">
                          {" "}
                          <i className="fa fa-user" aria-hidden="true"></i>
                          Sign up
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a href="#/" style={{ color: "#fff" }}>
                          Forgot Password
                        </a>
                      </div>
                    </div>
                   
                  </form>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
            <div className="row">
                    <div className="col-md-12 mt-3">
                      {this.state.resStatus.isError ? (
                        <div className="alert alert-danger">
                          {this.state.resStatus.messages}{" "}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
