import React, { useState } from "react";
import logo from "../images/ustmchatLogo.png";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function Login() {
  const loginUser = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  const loginGuest = () => {
    auth.signInAnonymously().catch((error) => alert(error.message));
  };

  return (
    <div className="user">
      <img src={logo} alt="" />

      <div style={{ display: "flex" }}>
        <Button
          style={{ marginRight: "5px" }}
          variant="contained"
          color="primary"
          onClick={loginUser}
        >
          Log In with Google
        </Button>
        <Button variant="contained" color="primary" onClick={loginGuest}>
          Log in as a guest
        </Button>
      </div>
    </div>
  );
}

export default Login;
