import { Button, Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import db, { auth } from "./firebase";
import { selectUser } from "./features/userSlice";
import "./Home.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function Home() {
  const user = useSelector(selectUser);

  return (
    <div className="home">
      <div className="home__header">
        {console.log(user)}
        <h1>This is Home Page</h1>
        <Button onClick={() => auth.signOut()}>Logout</Button>
        <Avatar src={user.photo} />
        <h3>{user.displayName}</h3>
      </div>
      <div className="home__main">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
