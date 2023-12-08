import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/logo.png";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
// import { logIn } from "../../actions/AuthAction";
// import { signUp } from "../../api/AuthRequest";
import { login, register } from "../../redux/apiCalls";
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.user);
  // const loading = false;
  // console.log(loading);
  const [isSignUp, setIsSignUp] = useState(true);
  const [islogin, setIsLogin] = useState(false);
  const [emailerror, setEmailerror] = useState(null);
  const [error, setError] = useState(null);
  // console.log(loading);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
    email: "",
  });
  const [confirmpass, setConfirmPass] = useState(true);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (data.email.includes("@")) {
        const validEmail = data.email.split("@")[1];
        if (validEmail === "terii.in") {
          data.password === data.confirmpass
            ? register(data, dispatch, setError)
            : setConfirmPass(false);
          setIsSignUp(false);
          setEmailerror(null);
        } else {
          setEmailerror(`Only "terii.in" domain is excepted!`);
        }
      } else {
        setEmailerror(`Invalid Email address!`);
      }
    } else {
      login(data, dispatch, navigate, setError);
    }
  };
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      // course: "",
      // semester: "",
      // roll: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
      email: "",
    });
  };
  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>TERII Media</h1>
          <h6>
            Only faculty members and students who have
            <span
              style={{
                color: "var(--orange)",
                fontWeight: "800",
                fontSize: "18px",
              }}>
              {" "}
              "@terii.in"{" "}
            </span>
            domain mail id are allowed to use this Social media.
          </h6>
        </div>
      </div>
      {/* Right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          {isSignUp && (
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="infoInput"
                onChange={handleChange}
                value={data.username}
              />
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="example@terii.in"
              className="infoInput"
              onChange={handleChange}
              value={data.email}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmpass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}>
            * Confirm password is not same
          </span>
          {error !== null && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}>
              * Something went wrong! plz try again
            </span>
          )}
          {emailerror !== null && (
            <span
              style={{
                color: "red",
                fontSize: "12px",
                alignSelf: "flex-end",
                marginRight: "5px",
              }}>
              * {emailerror}
            </span>
          )}
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}>
              {isSignUp ? (
                <div>"Already have an acoount? Login!"</div>
              ) : (
                "Don't have an account? Sign Up"
              )}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}>
            {loading ? "Loading!" : isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
