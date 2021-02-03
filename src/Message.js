import { Avatar } from "@material-ui/core";
import React from "react";
import { selectUser } from "./features/userSlice";
import "./Message.css";
import { useSelector, useDispatch } from "react-redux";

function Message({ message, timestamp, user, imgUrl }) {
  return (
    <div className="message">
      <div className="message__info">
        <div className="message__avatar">
          <Avatar src={user.photo} />
        </div>
        <div className="message__body">
          <div className="message__user">
            <p>{user.displayName}</p>
            {/* <p>{user}</p> */}
            {/* <small>{new Date(timestamp?.toDate()).toUTCString()}</small> */}
            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
          </div>
          <div className="message__chat">
            <p>{message}</p>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className={imgUrl ? "message__img" : ""}
      ></div>
    </div>
  );
}

export default Message;
