import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import db, { auth } from "./firebase";

import "./Home.css";
import Sidebar from "./Sidebar";
// import Chat from "./Chat";
import Chat1 from "./Chat1";

function Home() {
  return (
    <div className="home">
      <div className="home__main">
        <div className="home__sidebar">
          <Sidebar />
        </div>
        <div className="home__chat">
          <Chat1 />
        </div>
      </div>
    </div>
  );
}

export default Home;
