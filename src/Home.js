import { Button, Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import db, { auth } from "./firebase";
import { selectUser } from "./features/userSlice";
import "./Home.css";
import { Add } from "@material-ui/icons";
import setChannelInfo from "./features/appSlice";

function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("add channel name");
    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className="home">
      <div className="home__header">
        {console.log(user)}
        <h1>This is Home Page</h1>
        <Button onClick={() => auth.signOut()}>Logout</Button>
        <Avatar src={user.photo} />
        <h3>{user.displayName}</h3>
      </div>
      <div className="home__main">
        <div className="sidebar">
          <h1>Sidebar</h1>
          <Add onClick={handleAddChannel} />
          {channels.map(({ id, channel }) => (
            <div
              // onClick={() =>
              //   dispatch(
              //     setChannelInfo({
              //       channelId: id,
              //       channelName: channel.channelName,
              //     })
              //   )
              // }
              className="channel"
            >
              <p>{channel.channelName}</p>
            </div>
          ))}
        </div>
        <div className="chat">
          <h1>chat</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
