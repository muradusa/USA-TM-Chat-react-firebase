import React from "react";
import "./Chat.css";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Message from "./Message";
import { useEffect } from "react";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import { Button } from "@material-ui/core";
import db, { storage } from "./firebase";
import WebcamCapture from "./WebcamCapture";

function Chat() {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");

  const [image, setImage] = useState("null");
  const [progress, setProgress] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const submitMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("posts").add({
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: caption,
    });
    setCaption("");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("channels").doc(channelId).collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: url,
              user: user,
              message: caption,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  useEffect(() => {
    const wait = setTimeout(() => {
      alert("Please select a channel on the left");
    }, 2000);
  }, []);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setPosts(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <h3>
          {channelName
            ? `# ${channelName}`
            : "Please select a channel to chat or create a new one"}
        </h3>
      </div>

      <div className="chat__body">
        {posts.map((post) => (
          <Message
            message={post.message}
            user={post.user}
            timestamp={post.timestamp}
            imgUrl={post.imageUrl}
          />
        ))}
        {/* <div className="camera">
          <WebcamCapture />
        </div> */}
      </div>

      {channelName ? (
        <div className="chat__message">
          <form className="form" action="submit">
            <div className="message__caption">
              <input
                type="text"
                placeholder="Type your message here and press enter to submit"
                onChange={handleCaption}
                value={caption}
                disabled={!channelId}
              />
              <button
                hidden
                type="submit"
                onClick={submitMessage}
                disabled={!channelId}
              >
                submit
              </button>
            </div>

            <div className="message__upload">
              <input
                type="file"
                disabled={!channelId}
                onChange={handleChange}
                className="fileInput"
              />

              <Button
                className="button"
                disabled={!image}
                onClick={handleUpload}
                hidden
              >
                Upload
              </Button>
              <progress value={progress} max="100"></progress>
            </div>
          </form>
        </div>
      ) : (
        <div className="imageUpload"></div>
      )}
    </div>
  );
}

export default Chat;
