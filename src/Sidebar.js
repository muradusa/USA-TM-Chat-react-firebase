import React, { useEffect, useState } from "react";
import { Add } from "@material-ui/icons";
import { setChannelInfo } from "./features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import db, { auth } from "./firebase";
import "./Sidebar.css";
import { selectUser } from "./features/userSlice";
import { Button, Avatar } from "@material-ui/core";

function Sidebar() {
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
    <div className="sidebar">
      <div className="sidebar__header">
        <h1>Sidebar</h1>
        <Add onClick={handleAddChannel} />
      </div>
      <div className="sidebar__channels">
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
      <div className="sidebar__user">
        <div onClick={() => auth.signOut()} className="sidebar__userInfo">
          <Avatar src={user.photo} />
          <h5>{user.displayName}</h5>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
