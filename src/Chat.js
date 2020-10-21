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
import ImageUpload from "./ImageUpload";

function Chat() {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  // const [input, setInput] = useState("");
  // const [messages, setMessages] = useState([]);
  const [posts, setPosts] = useState([]);

  // const submitMessage = (e) => {
  //   e.preventDefault();
  //   db.collection("channels").doc(channelId).collection("messages").add({
  //     message: input,
  //     user: user,
  //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  //   setInput("");
  // };

  // useEffect(() => {
  //   if (channelId) {
  //     db.collection("channels")
  //       .doc(channelId)
  //       .collection("messages")
  //       .orderBy("timestamp", "asc")
  //       .onSnapshot((snapshot) =>
  //         setMessages(snapshot.docs.map((doc) => doc.data()))
  //       );
  //   }
  // }, [channelId]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc("channelId")
        .collection("posts")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setPosts(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  console.log(posts);

  return (
    <div className="chat">
      <div className="chat__header">
        <h2>
          {channelName
            ? `# ${channelName}`
            : "Please select a channel to chat or create a new one"}
        </h2>
      </div>
      {/* <div className="chat__body">
        {messages.map((message) => (
          <Message
            message={message.message}
            user={message.user}
            timestamp={message.timestamp}
          />
        ))}
      </div> */}
      <div className="chat__body">
        {posts.map((post) => (
          <Message
            message={post.message}
            user={post.user}
            timestamp={post.timestamp}
            imgUrl={post.imageUrl}
          />
        ))}
      </div>

      <div className="chat__message">
        <ImageUpload />
        {/* <form className="form" action="submit">
          <input
            className="input"
            type="text"
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message # ${
              channelName ? channelName : "Select a channel to start chatting"
            }`}
          />
          <button
            hidden
            // type="submit"
            onClick={submitMessage}
            disabled={!channelId}
          >
            submit
          </button>
        </form> */}
      </div>
    </div>
  );
}

export default Chat;
