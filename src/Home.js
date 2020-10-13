import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import db, { auth } from "./firebase";

import "./Home.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function Home() {
  return (
    <div className="home">
      <div className="home__header"></div>
      <div className="home__main">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
