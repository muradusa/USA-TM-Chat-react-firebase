import { Avatar } from "@material-ui/core";
import React from "react";
import { selectUser } from "./features/userSlice";
import "./Message.css";
import { useSelector, useDispatch } from "react-redux";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function Message({ message, timestamp, user, imgUrl }) {
  const handle = useFullScreenHandle();
  return (
    <div className="message">
      <div className="message__info">
        <div className="message__avatar">
          <Avatar src={user.photo} />
        </div>
        <div className="message__body">
          <div className="message__user">
            <p>{user.displayName}</p>

            <small>{timestamp?.toDate().toLocaleString()}</small>
          </div>
          <div className="message__chat">
            <p>{message}</p>
          </div>
        </div>
      </div>
      <FullScreen handle={handle}>
        <button onClick={handle.enter}>Enter fullscreen</button>
        <div
          style={{ backgroundImage: `url(${imgUrl})` }}
          className={imgUrl ? "message__img" : ""}
        ></div>
      </FullScreen>
    </div>
  );
}

export default Message;
