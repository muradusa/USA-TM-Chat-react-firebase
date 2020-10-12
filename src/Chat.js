import React from "react";
import "./Chat.css";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Message from "./Message";
import { useEffect } from "react";
import db from "./firebase";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";

function Chat() {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const submitMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <h2>{channelName ? channelName : "Heroku"}</h2>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <Message
            message={message.message}
            user={message.user}
            timestamp={message.timestamp}
          />
        ))}
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
          <button type="submit" onClick={submitMessage} disabled={!channelId}>
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
