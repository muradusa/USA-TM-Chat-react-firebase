import React from "react";
import "./Chat1.css";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Message from "./Message";
import { useEffect } from "react";
import firebase from "firebase";
import { selectUser } from "./features/userSlice";
import { Button } from "@material-ui/core";
import db, { storage } from "./firebase";
// import ImageUpload from "./ImageUpload";

function Chat1() {
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
      console.log(image);
    }
  };

  const handleUpload = () => {
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
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("channels").doc(channelId).collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              message: caption,
              imageUrl: url,
              user: user,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("posts")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setPosts(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <h2>
          {channelName
            ? `# ${channelName}`
            : "Please select a channel to chat or create a new one"}
        </h2>
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
      </div>

      <div className="chat__message">
        <div className="imageUpload">
          <progress value={progress} max="100"></progress>
          <input
            type="text"
            placeholder="Enter a  caption"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            disabled={!channelId}
          />
          <input type="file" disabled={!channelId} onChange={handleChange} />
          <Button
            className="button"
            disabled={!channelId}
            onClick={handleUpload}
            // hidden
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat1;
