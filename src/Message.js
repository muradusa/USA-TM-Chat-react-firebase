import { Avatar } from "@material-ui/core";
import React from "react";
import { selectUser } from "./features/userSlice";
import "./Message.css";
import { useSelector, useDispatch } from "react-redux";

function Message() {
  const user = useSelector(selectUser);
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <p>{user.displayName}</p>
      <small>Timestamp</small>
      <p>message text</p>
    </div>
  );
}

export default Message;
