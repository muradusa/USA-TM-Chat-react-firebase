import React, { useEffect, useState } from "react";
import { Add } from "@material-ui/icons";
import { setChannelInfo } from "./features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import db, { auth } from "./firebase";
import "./Sidebar.css";

function Sidebar() {
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
    <div className="sidebar">
      <h1>Sidebar</h1>
      <Add onClick={handleAddChannel} />
      {channels.map(({ id, channel }) => (
        <div
          onClick={() =>
            dispatch(
              setChannelInfo({
                channelId: id,
                channelName: channel.channelName,
              })
            )
          }
          className="channel"
        >
          <p>{channel.channelName}</p>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
