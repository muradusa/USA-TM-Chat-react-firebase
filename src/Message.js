import { Avatar } from "@material-ui/core";
import React from "react";
import { selectUser } from "./features/userSlice";
import "./Message.css";
import { useSelector, useDispatch } from "react-redux";

function Message({ message, timestamp, user }) {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <p>{user.displayName}</p>
      <small>{new Date(timestamp?.toDate()).toUTCString()}</small>
      <p>{message}</p>
    </div>
  );
}

export default Message;
