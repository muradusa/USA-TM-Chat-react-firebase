import { Button } from "@material-ui/core";
import db, { storage } from "./firebase";
import React, { useState } from "react";
import "./ImageUpload.css";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";

function ImageUpload() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("null");
  const [progress, setProgress] = useState("");
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const user = useSelector(selectUser);

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

  return (
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
      <Button disabled={!channelId} onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;
