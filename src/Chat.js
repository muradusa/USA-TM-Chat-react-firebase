import React from "react";
import "./Chat.css";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Message from "./Message";

function Chat() {
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [input, setInput] = useState("");

  return (
    <div className="chat">
      <div className="chat__header">
        <h2>{channelName ? channelName : "Heroku"}</h2>
      </div>
      <div className="chat__body">
        <Message />
      </div>
      <div className="chat__message">
        <form action="submit">
          <input
            type="text"
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message # ${channelName ? channelName : "Heroku"}`}
          />
          <button>submit</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
