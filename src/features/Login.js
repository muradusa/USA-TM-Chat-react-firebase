import React, { useState } from "react";
import logo from "../images/ustmchatLogo.png";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function Login() {
  const loginUser = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="user">
      <img src={logo} alt="" />
      <Button variant="contained" color="primary" onClick={loginUser}>
        Log In with Google
      </Button>
    </div>
  );
}

export default Login;
