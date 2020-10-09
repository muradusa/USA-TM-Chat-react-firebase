import { Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { auth } from "./firebase";
import { selectUser } from "./features/userSlice";
import "./Home.css";

function Home() {
  const user = useSelector(selectUser);
  return (
    <div className="home">
      {console.log(user)}
      <h1>This is Home Page</h1>
      <Button onClick={() => auth.signOut()}>Logout</Button>
      <img src={user.photo} alt="" />
    </div>
  );
}

export default Home;
